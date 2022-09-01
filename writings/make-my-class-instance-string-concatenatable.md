---
title: "Make the instance of my class to be concatenatable with string"
date: "2021-05-25T00:00:00.00Z"
og:
  description: "Rubyists approach to make the instance of a custom class to be concatenatable with another string or string based object"
  image: "https://naveenhonestraj.in/og/instance-concat.png"
author:
  twitter: "nav_devl"
  name: "Naveen Honest Raj"
---

Hello, the goal of this article is to understand certain methods of Ruby's `String` class and how it interacts with other class objects. Let's break down the goal into small sub-goals.

1. Understand `to_s` method of String class.

2. Learn to concatenate two strings.

3. Learn to concatenate two instances of custom class.

4. Learn to concatenate a string and an instance of custom class.

## Understanding "to_s" of String class

As a Rubyist, we are aware that the instances of classes like Integer, Float all has their `.to_s` method to convert them to a string. This makes a complete meaning to it.

Ex., the following example works like intended.

```ruby
1.to_s
 => "1"

12.30.to_s
 => "12.3"
```

Similarly, the String class objects also has `.to_s` to it which just returns `self` i.e, the string itself. You can read about this on here (https://ruby-doc.org/core-2.6/String.html#method-i-to_s)

Initially this might look like it has no value to the String class. But that's the beauty of Ruby, right? Nothing is ever written without any intention. We'll see the whole picture in the coming sections. So, we are now good with the `.to_s`


## Learn to concatenate two strings.

Feel free to skip this if you are very much aware of this. We all know that two strings can be concatenated(joined) using the plus (+) operator. Behind the screens, this works similar to a function call.

For our case, just a quick assumption (this is not the real implementation, but a quick assumption to have a small clarity picture running in our mind)

```ruby
class String
  def +(another_string)
    # here goes the implementation
  end
end
```

So when a string(which is instance of the String class) is concatenated using plus (+) operator, it executes something similar to how we narrated above. To understand more about how Ruby allows you to use operator based function calls, take a quick look into this tweet (https://twitter.com/codewithjulie/status/1417333354467266561). Single tweet speaks a lot of words in here.

Now we are good to concatenate two strings. Let's move on to the next section.

## Learn to concatenate two instances of custom class.

Just jumping directly to a example implementation here. Grabbing a little part of code from codewithjulie's tweet. 

```ruby
class Person
  attr_reader :name # Make sure to add this because we wanted to read using .name

  def initialize(name)
    @name = name
  end

  def +(another_person)
    @name + another_person.name
  end
end

Person.new("Naveen") + Person.new("Honest")
=> NaveenHonest

```

Awesome, right?

## Learn to concatenate a string and an instance of custom class.

In this case, we have two different scenarios that can happen.

1. The first one is our custom class instance and second one is string.
```ruby
Person.new("Naveen") + " Honest"
```

2. The first one is string and the second one is our custom class instance. 
```ruby
"hello " + Person.new("Naveen")
```

If we can apply our idea from the class used in our previous section with a minor change, the #1 is easily sorted. It works. But what if we try the #2 on the same class, we'll end up with `TypeError (no implicit conversion of Person into String)` error.

```ruby
class Person
  def initialize(name)
    @name = name
  end

  def +(another_string)
    @name + another_string
  end
end

Person.new("Naveen") + " Honest"
=> "Naveen Honest"

"hello " + Person.new("Naveen")
=> TypeError (no implicit conversion of Person into String)
```

### What is our Ruby trying to do in here?
Ruby is trying to implicitly change our custom class instance to string, but failed because we didn't write any function to handle that. But how does Ruby tries to do the implicit conversion?

Quick look into our RubyDocs (https://ruby-doc.org/core-2.6/String.html#method-i-to_str) says the definition of `to_str` as follows,

> If called (...), converts the receiver to a String object.

Awesome! Now we know what it calls. Let's redefine our class a little.

```ruby
class Person
  def initialize(name)
    @name = name
  end

  def to_str
    @name
  end

  def +(another_string)
    @name + another_string
  end
end

"hello " + Person.new("Naveen")
=> "hello Naveen"
```


That's great! We covered almost everything. Now our class can do String + Custom class instance concatenation, but alas, we lost the ability to concatenate two instances of custom class.

Now if we can put our first section to use, we can achieve that as well.

```ruby
class Person
  def initialize(name)
    @name = name
  end

  def to_s
    @name
  end

  def to_str
    self.to_s
  end

  def +(obj)
    @name + obj
  end
end

"hello " + Person.new("Naveen")
=> "hello Naveen"

Person.new("Naveen") + " Honest"
=> "Naveen Honest"

Person.new("Naveen") + Person.new("Honest")
=> "NaveenHonest"

```

I know, this kind of takes a little time to get comfortable with. I mean, you folks are genius, but it took me a little while to get comfortable with code like this. Now, writing and working with these beauties, I understood how intentionally they have written a lot of Ruby idealogies and how super awesome it is. 

DM me if you find more amazing things and if you find this article on a tweet or something, feel free to interact and share. 