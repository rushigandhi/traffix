# Traffix (Winner at DeltaHacks 2020)

![Training Generations](https://raw.githubusercontent.com/rushigandhi/traffix/master/assets/generations.png "Training Generations")

[Check out the project on Devpost](https://devpost.com/software/traffix-pns9ax)

## Inspiration

Traffic is a pain and hurdle for everyone. It costs time and money for everyone stuck within it. We wanted to empower everyone to focus on what they truly enjoy instead of having to waste their time in traffic. We found the challenge to connect autonomous vehicles and enable them to work closely with each other to make maximize traffic flow to be very interesting. We were specifically interested in aggregating real data to make decisions and evolve those over time using artificial intelligence.

## What it does

We engineered an autonomous network that minimizes the time delay for each car in the network as it moves from its source to its destination. The idea is to have 0 intersections, 0 accidents, and maximize traffic flow.

We did this by developing a simulation in P5.js and training a network of cars to interact with each other in such a way that they do not collide and still travel from their source to target destination safely. We slowly iterated on this idea by first creating the idea of incentivizing factors and negative points. This allowed the cars to learn to not collide with each other and follow the goal they're set out to do. After creating a full simulation with intersections (allowing cars to turn and drive so they stop the least number of times), we created a simulation on Unity. This simulation looked much nicer and took the values trained by our best result from our genetic AI. From the video, we can see that the generation is flawless; there are no accidents, and traffic flows seamlessly. This was the result of over hundreds of generations of training of the genetic AI. You can see our video for more information!

## How we built it

We trained an evolutionary AI on many physical parameters to optimize for no accidents and maximal speed. The allowed the AI to experiment with different weights for each factor in order to reach our goal; having the cars reach from source to destination while staying a safe distance away from all other cars.

## Challenges we ran into

Deciding which parameters to tune, removing any bias, and setting up the testing environment. To remove bias, we ended up introducing randomly generated parameters in our genetic AI and "breeding" two good outcomes. Setting up the simulation was also tricky as it involved a lot of vector math.

## Accomplishments that we're proud of

Getting the network to communicate autonomously and work in unison to avoid accidents and maximize speed. It's really cool to see the genetic AI evolve from not being able to drive at all, to fully being autonomous in our simulation. If we wanted to apply this to the real world, we can add more parameters and have the genetic AI optimize to find the parameters needed to reach our goals in the fastest time.

## What we learned

We learned how to model and train a genetic AI. We also learned how to deal with common issues and deal with performance constraints effectively. Lastly, we learned how to decouple the components of our application to make it scalable and easier to update in the future.

## What's next for Traffix

We want to increasing the user-facing features for the mobile app and improving the data analytics platform for the city. We also want to be able to extend this to more generalized parameters so that it could be applied in more dimensions.

## Checkout the demo video here:

[https://www.youtube.com/watch?v=\_5HqsxU0rh0](https://www.youtube.com/watch?v=_5HqsxU0rh0)

[![Traffix Demo Video](http://img.youtube.com/vi/_5HqsxU0rh0/0.jpg)](https://www.youtube.com/watch?v=_5HqsxU0rh0)
