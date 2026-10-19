# SpaceJoust

A free, original neon flapping-combat arcade game with a head nod to the classic 80s joust-on-a-flying-mount game. You ride a space-bird, flap to stay aloft, and ram rival riders from above. Beat a rider and it drops an egg: grab it before it hatches into a tougher one.

**Play it in your browser:** https://nbwillcox.github.io/SpaceJoust/

Everything is generated in code: the riders, arenas, lava and bosses are vector-drawn on the fly, and all sound effects and the title tune are synthesized with the Web Audio API. There are no image or audio files and no build step. A sibling of [SpaceGalaShooter](https://github.com/nbwillcox/SpaceGalaShooter), [SpaceQix](https://github.com/nbwillcox/SpaceQix), [SpaceTube](https://github.com/nbwillcox/SpaceTube) and the rest of the series.

## Controls

| Action | Keys |
| --- | --- |
| Steer | `←` `→` or `A` `D` (or a gamepad d-pad / stick) |
| Flap (tap it again and again to climb) | `Space`, `↑`, `W`, `Z`, `X` or left mouse button |
| Pause | `P` or `Esc` |

Each flap gives a push upward, so a steady rhythm holds you in the air and a quick burst climbs. Screens wrap left to right.

### On a phone or tablet

Play in landscape. A floating stick on the left steers; on the right, tap **FLAP** again and again to climb. The pause button opens the menu. The on-screen controls appear on touch devices automatically; Settings has size, opacity and a left-handed layout. Use your browser's *Add to Home Screen* to install it as a full-screen app.

## Gameplay

- **The joust:** when two riders collide, the **higher** one wins. Level with each other, you just bounce apart. Get above your target and strike.
- **Eggs:** a beaten rider drops an egg that bounces around the platforms. Collect it for points (a chain of quick pickups is worth more), or it hatches into the next tougher rider. Eggs that fall into the lava are lost.
- **The riders:** Drifters (red) are the easiest, Raiders (blue) hunt you more cleverly, and Warlords (gold) are fast and aggressive. Hatched riders are one tier tougher than the egg.
- **The lava hand:** fly too low over the lava and a hand grabs you and drags you down. Flap quickly to pull free. The riders it grabs are lost too.
- **The wraith:** if a wave drags on, a fast ghostly hunter arrives. Platforms and jousts do not stop it: you can only kill it by hitting its head with your lance (it will kill you if you touch its body).
- **Bosses:** every fifth wave brings a giant bird, The Skyhulk (it dives at you), The Broodmother (it spawns riders) or The Stormwing (it fires bolts). Land on the glowing weak spot on its back to hurt it, but if it hits you from the side or below you lose a life.
- **Power-ups** drop from beaten riders: **S** shield, **R** rapid wings, **L** big lance (wins closer jousts and reaches the wraith), **M** egg magnet, and **1UP**.
- **Upgrade shop:** after every wave, spend your credits (one for every ten points) on stronger wings, speed, a longer lance, a bigger magnet, a slower hatch, a starting shield, or an extra life.
- **Lives and score:** 3 lives, an extra life every 20,000 points. Local top-10 high scores are kept in your browser.

## Run it locally

Open `index.html` in a browser, or serve the folder with any static server, for example `python -m http.server`. Test flags: `?level=N` starts on wave N, `?god=1` makes you immune, `?touch=1` forces the touch controls on a desktop.

## License

[CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/): free to play, share and remix for non-commercial use, with a link back to https://github.com/nbwillcox/SpaceJoust. SpaceJoust is an original game inspired by the arcade golden age; it uses no names, art, sounds or code from any commercial game.
