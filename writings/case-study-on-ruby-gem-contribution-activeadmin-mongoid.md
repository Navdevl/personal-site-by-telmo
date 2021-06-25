---
title: "Case study on Ruby Gem Contribution: activeadmin-mongoid"
date: "2021-06-25T00:00:00.00Z"
og:
  description: "Writing down the thought process went behind trying to solve a small issue in activeadmin-mongoid and raising my first PR on the activeadmin's umbrella."
  image: "https://naveenhonestraj.in/static/media/activeadmin-mongoid-og.png"
author:
  twitter: "nav_devl"
  name: "Naveen Honest Raj"
---

For the people who are very much in the Rails development, you definitely should've used Activeadmin on one of your projects. If not, please [have a look at it.](https://github.com/activeadmin/activeadmin) It is an amazing community running a very helpful gem.

For those who aren't familiar with Rails, this gem provides us to build admin controlled management side for the models present in the application quickly. Provides set of conventions and working along those lines, you can quickly get your admin dashboard ready. For Django-familiar people, it is similar to django-admin.

The gem `activeadmin` sits very well with the relational DB using Rails `activerecord` and for the projects that uses NoSQL DB like Mongo, there is another gem under the same umbrella - `activeadmin-mongoid` (https://github.com/activeadmin/activeadmin-mongoid)

## Little story behind activeadmin-mongoid
ActiveAdmin is holding off on pulling Mongoid support into the core ActiveAdmin application. Maybe in future activeadmin will provide support for NoSQL directly through its gem.

This gem's repo was pulled into the ActiveAdmin org from previous work done by **Elia Schito**. Currently, it is maintained by **Grzegorz Jakubiak, Nic Boie, JD Guzman, Elia Schito** and other ActiveAdmin and community members.

## Quick technical glimpse about the activeadmin-mongoid

`Mongoid` based Rails projects mostly won't require `activerecord` in their model methods and also wouldn't need any migration because we aren't dealing with the usual processes in the SQL world.

Similarly, `activeadmin-mongoid` as a gem also avoids to require Rails's `activerecord` related elements. This is something to be considered when introducing any new additions to the gem. *(atleast at the time of writing)*

## What was the issue
`activeadmin-mongoid` depends on the `activeadmin` and holds the generator calls like `rake activeadmin:install` to generate the initializer files. By default, the activeadmin generates configuration files and a db migration file as well.

So like we mentioned, db migration is valid in the world of SQL (within our context of explanation), but considering with Mongoid, that file is completely unnecessary and users were deleting them after it gets generated because it makes no sense and no use.

One user pointed that out and raised an issue on that. https://github.com/activeadmin/activeadmin-mongoid/issues/137

So I was a little bit curious to try solving that out. There were a little discussions went on the thread and [Nic Boie](https://github.com/boie0025), one of the maintainers gave it a shot and added what he tried and what was the result. That helped me to set the first direction towards solving the issue. Thanks to Nic!

![Nic Boie's solution](../../static/media/nic-boie-solution.png)

## Towards solution
Ideally, Nic Boie's solution solved the problem. It stopped the command from generating the migration file. But, while trying to open the class and override the method to make it do nothing, he has to require certain files and these files required has dependent requires and one of them brought in the `activerecord` related files. So, now my task is to do the exact thing what Nic did, but without letting the `activerecord` getting required through any dependent calls or so.

This is the solution Nic provided

    require 'active_admin/mongoid'
    require 'generators/active_admin/install/install_generator.rb'

    ActiveAdmin::Generators::InstallGenerator.class_eval do

      # Make this a no-op so the AR migrations are not installed when ActiveAdmin-Mongoid is used.
      def create_migrations;end
    end

## Reading through the activeadmin gem
So, I took my time to read through the activeadmin gem and see for the class that Nic used above to override with `class_eval`.

Studying the class `ActiveAdmin::Generators::InstallGenerator` [from here helped me](https://github.com/activeadmin/activeadmin/blob/master/lib/generators/active_admin/install/install_generator.rb#L5) to understand that the current class is the one which requires `activerecord` related files, but the parent class of this class doesn't requires any of those.

So the solution I came up with was, to go change the parent class of `ActiveAdmin::Generators::InstallGenerator` to do the following:

1. When a class subclasses from it, I need to change the way the subclass is described.

2. Then either override the method definition or disallow it from overriding.

## self.inherited method
Ruby has a wonderful hook on class called `inherited` which will be called when a class is used by another class to derive itself. Using that `inherited` you can control specific way of the derived class. Cool, isn't it? I even tweeted about it here https://twitter.com/nav_devl/status/1405329547701096452

The only caveat with the idea I had was, I assumed when the self.inherited was called, the subclass will be fully defined and I can just remove/override the definition of `create_migrations` method. But turns out, when the self.inherited was called, there are no user defined methods are present. 😔

## self.method_added
Again, Ruby as charming as always, provides us with a hook called `method_added` and this is called every time a new method method definition is added to a class. Now can you see where we are heading towards?

So we are going to combine the advantage of  `self.inherited` and `self.method_added` 🤯


## Moving with solving
So, now our next set of action is very simple.
- Define an empty `create_migrations` in the parent class.
- When a class is derived from it, we are redefining the `self.method_added`'s definition. Classy, right? 😎
- So, if the derived class's name is `ActiveAdmin::Generators::InstallGenerator` we are redefining the `self.method_added` of that subclass to remove the method definition of `create_migration` 
- `remove_method` will remove only the method definition scoped to that class, so our derived class will now lookup to parent class for definition when `create_migration` is called.
- And we have an empty NO ACTION definition in our parent class.
- **No activerecord related items** are required while doing this.
- Bam! 🎉🎉


    Rails::Generators::NamedBase.class_eval do
      def create_migrations
      end

      def self.inherited(klass)
        super
        if klass.name == "ActiveAdmin::Generators::InstallGenerator"
          klass.class_eval do 
            def self.method_added(method_name)
              super
              remove_method method_name if method_name == :create_migrations
            end
          end
        end
      end
    end


![Pull request on the activeadmin-mongoid repo](../../static/media/activeadmin-mongoid-pr-screenshot.png)
This is my implementation and the PR is here (https://github.com/activeadmin/activeadmin-mongoid/pull/164) It is yet to be merged. 2/3 reviewer approved and hopefully I think it gets approved and merged. 
