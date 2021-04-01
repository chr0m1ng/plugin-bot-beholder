# take-plugin-bot-beholder

Generated by [Generator BLiP Plugin](https://github.com/chr0m1ng/generator-blip-plugin).

> YEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEES IT'S TRUUUUUUUUUUEEEEEEE
>
> -- <cite>Cid do Não Salvo</cite>

The [Solutions Lab Team][solutions-lab] is excited to delivery the famous bot beholder that most take.seres thought to be a myth. 

Bot Beholder it's finally alive and better than never because now we can debug **ROUTERS**! 
Yeah, you read it right, we finally can **debug routers** 🎉

> Have you met Bot Beholder?
>
> -- <cite>Barney Stinson</cite>

For the new ones that never met the [original bot beholder][original-beholder] it was created to help debugging development/production bots among other things, but let's concentrate on the principal feature, the **Tracing**.

# Tracing for babies

Let's be simple and go to what we want here, with **tracing** is possible to follow all the steps of users in a giving bot, so with this feature you can search for a specific user and follow it's trail, contact, contexts, elapsed time on each action and the complete raw log of the actions made at every step.

Imagine the following scenario: 
Someone just asked you: _Why my user is stuck at this point of the flow?_

What do you do? Simple.
Just go to beholder's tracing feature, filter the user and see what's going on, just like that, no need to open 10000 commands to validate the user's statedid, most of the things will be there for you to check.

# Enough with the talking, show me what I want

Ok, but you asked for it:

![beholder.png](https://user-images.githubusercontent.com/11679657/113342658-203e3780-9305-11eb-80e9-27973c7029f4.png)

Want to see some tracing? take a look at this bad boy:

![tracing.png](https://user-images.githubusercontent.com/11679657/113342703-2c29f980-9305-11eb-9460-e8d341bc3245.png)

What about contact and contexts?

![contact.png](https://user-images.githubusercontent.com/11679657/113342775-46fc6e00-9305-11eb-9e9a-295b11e6e761.png)


Create edit and delete context variables, do you like it?

![edit_context.png](https://user-images.githubusercontent.com/11679657/113342809-5380c680-9305-11eb-81b9-f3750f571937.png)


Did you just said "Show me my raw data"?

![details.png](https://user-images.githubusercontent.com/11679657/113342818-55e32080-9305-11eb-9ca2-8c7a78ea8566.png)


Not that much, just one state? Ok

![state-details.png](https://user-images.githubusercontent.com/11679657/113342821-57ace400-9305-11eb-9d0d-951e873916e9.png)


# JUST SHOW ME HOW

Here it goes, feel free to play with it!

## Advanced Configurations

Add the plugin url to your advanced configurations, if you already have others plugins just append it to the dictionary.

- Url: https://take-plugin-bot-beholder.cs.blip.ai


| Domain                    | Name    | Value                                                                                           |
|---------------------------|---------|-------------------------------------------------------------------------------------------------|
| postmaster@portal.blip.ai | Plugins | {"beholder-plugin": {"name": "Beholder", "url": "https://take-plugin-bot-beholder.cs.blip.ai"}} |

## Configuring the tracing

**This just need to be done once!**
**You need admin access on all bots, in case of router in all connected subbots**

1. At beholder's page, click the button that says "Activate bot's tracing". 
2. **After that you need to publish the flow**, if it's a simple bot just publish it's own flow, if it's a **router you need to publish every subbot flow**.


# That's all folks!

Feel free to send PRs to improve something or add new features! But always keep in mind the remaining question: Who beholds the beholder?

[original-beholder]: https://github.com/albert-dm/bot-beholder

## Usage

Just install the dependencies:

```bash
$ npm install
```

Then:

```bash
$ npm start
```

| Action                                   | Usage               |
| ---------------------------------------- | ------------------- |
| Starting development mode                | `npm start`         |
| Linting code                             | `npm run lint`      |
| Running unit tests                       | `npm run jest`      |
| Running lint + tests                     | `npm test`          |
| Running code coverage                    | `npm run coverage`  |
| Sending coverage results to Coveralls.io | `npm run coveralls` |

## Author

Gabriel Rodrigues dos Santos

## License

[license-url]: https://opensource.org/licenses/MIT
[license-badge]: https://img.shields.io/badge/License-MIT-yellow.svg
