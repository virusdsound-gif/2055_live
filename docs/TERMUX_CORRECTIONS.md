# Termux mistakes — corrected

Termux built a skeleton and then **printed LIVE on empty boxes**. This file is the ledger of those mistakes. The workshop is kept. The lies are not.

| Mistake | What it did | Correction |
| --- | --- | --- |
| `dsound mint` / `wallet` / `live` | Printed success, tickets, ESS balances | CLI prints **deferred**. No fake success. |
| `state/db.json` | `"live": { "active": true }` + wallets | Archive. `active: false`. Not a stream. |
| `essentium_dashboard_data.json` | `psi_e`, `morning_star_active: true` | Archive. No energy score as status. Morning Star sitting is the web room, not this JSON. |
| `2055_live_state.json` | Same theatre | Archive stamp. `morning_star_active` is not a flag you set in JSON. |
| `nft/morning-star.json` | Emoji, fake IPFS, +40% stake, Legendary yield | Deferred metadata. No yield. URI waits on X. |
| Identity | Django Sound as if a second artist | **KNG DRIZZ** artist. **Django Sound** label/genre. **Essentium** grid name. |
| Empty stubs (`ai/symbolic_generator.py`, protocols) | Looked like engines | One-line archive stubs. |
| `start2055` Termux home path | Broke off the phone | Portable `ROOT` + `cli/main.py`. |
| `bin/dsound.js` + commander | Missing deps, crashed | Thin spawn of Python CLI. |
| `django_sound.py` pulse loop | Hung the session | `--once`. No infinite LIVE. |
| Interactive menus (`2055_core.py` etc.) | EOFError off-tty | Argv / non-interactive scan. |
| SYSTEM_STATUS “command dashboard Online” | Cockpit as product | Archive. Door is the listening room. |
| Timeline JSON `synchronization_status: active` | Labels as runtime | Archive labels. 0.7 Hz is the only root in the room. |

**Rule that was missing**

Never report live on an empty vault. Never mint without X. Never treat Ψ(E) as a balance.

**What Termux still is**

Optional backup. Not the studio. Not the door. Run `./start2055 status` if you must; it must tell the truth.
