#!/usr/bin/env node

const { Command } = require('commander');
const fs = require('fs');

const chalk = {
  green: (s) => s,
  cyan: (s) => s,
  yellow: (s) => s,
  red: (s) => s
};

const program = new Command();

const me = 'kng_drizz';

const W = {
  artist: 'Django Sound'
};

const DB_PATH = '/data/data/com.termux/files/home/2055_live/state/db.json';

let db = {
  data: {
    live: null
  }
};

if (fs.existsSync(DB_PATH)) {
  db.data = JSON.parse(fs.readFileSync(DB_PATH));
}

function save() {
  fs.writeFileSync(DB_PATH, JSON.stringify(db.data, null, 2));
}

function log(type, amount, from, to, meta = {}) {
  console.log('[LOG]', {
    type,
    amount,
    from,
    to,
    meta
  });
}

if (!db.data.wallets) {
  db.data.wallets = {};
}

function bal(user) {

  if (!db.data.wallets[user]) {
    db.data.wallets[user] = 10;
  }

  return db.data.wallets[user];
}

function setBal(user, amount) {
  db.data.wallets[user] = amount;
  save();
}

function burn(amount, reason) {

  const current = bal(me);

  if (current < amount) {
    throw new Error('Insufficient ESS');
  }

  db.data.wallets[me] -= amount;

  save();

  console.log(`🔥 Burned ${amount} ESS (${reason})`);
}

program
  .name('dsound')
  .description('2055_live CLI')
  .version('1.0.0');

program.command('live')
  .option('--start', 'Start 2055_live stream of your beats')
  .option('--stop', 'Stop stream')
  .option('--ticket <n>', 'ESS to enter stream', '0')
  .description('Start token-gated live stream. 100% of tickets burned')
  .action(async (o) => {

    try {

      if (o.start) {

        if (db.data.live?.active) {
          return console.log(chalk.yellow('A stream is already active'));
        }

        const ticket = Number(o.ticket);

        db.data.live = {
          active: true,
          host: me,
          ticket,
          started: Date.now(),
          viewers: [],
          burned: 0
        };

        console.log(chalk.green('🔴 2055_live NOW LIVE'));
        console.log(chalk.cyan(`→ Host: ${W.artist}`));
        console.log(chalk.cyan(`→ Ticket: ${ticket} ESS | Burned on entry`));
        console.log(chalk.cyan(`→ Stream: https://2055.live/${me}`));

        log('LIVE_START', 0, me, '2055', { ticket });

        save();
      }

      if (o.stop) {

        if (!db.data.live?.active) {
          return console.log(chalk.yellow('No active stream'));
        }

        log(
          'LIVE_STOP',
          db.data.live.burned || 0,
          me,
          '2055',
          {
            viewers: db.data.live.viewers.length
          }
        );

        db.data.live.active = false;

        save();

        console.log(chalk.yellow('2055_live stream stopped'));
      }

    } catch (e) {

      console.log(chalk.red(`✗ Live failed: ${e.message}`));

    }

  });

program.command('enter')
  .argument('<host>', 'Host wallet/username')
  .description('Enter 2055_live stream. Burns ticket')
  .action(async (host) => {

    try {

      const live = db.data.live;

      if (!live?.active) {
        throw new Error('No live stream active');
      }

      if (live.host !== host) {
        throw new Error('Wrong host');
      }

      if (live.viewers.includes(me)) {
        return console.log(chalk.yellow('Already in stream'));
      }

      if (live.ticket > 0) {

        if (bal(me) < live.ticket) {
          throw new Error(`Need ${live.ticket} ESS for ticket`);
        }

        burn(live.ticket, 'live_ticket');

        live.burned += live.ticket;
      }

      live.viewers.push(me);

      log('LIVE_ENTER', live.ticket, me, live.host);

      save();

      console.log(chalk.green('✓ Entered 2055_live'));
      console.log(chalk.cyan(`→ https://2055.live/${host}`));
      console.log(chalk.red(`🔥 ${live.ticket} ESS burned`));

    } catch (e) {

      console.log(chalk.red(`✗ Enter failed: ${e.message}`));

    }

  });

program.command('status')
  .description('Show active 2055_live session')
  .action(() => {

    const live = db.data.live;

    if (!live?.active) {
      return console.log('No active stream');
    }

    const uptime = Math.floor((Date.now() - live.started) / 1000);

    console.log('🔴 LIVE NOW');
    console.log(`Host: ${live.host}`);
    console.log(`Ticket: ${live.ticket} ESS`);
    console.log(`Viewers: ${live.viewers.length}`);
    console.log(`Burned: ${live.burned} ESS`);
    console.log(`Uptime: ${uptime}s`);

    if (live.viewers.length > 0) {

      console.log('\nViewers:');

      live.viewers.forEach(v => {
        console.log(`- ${v}`);
      });

    }

  });
program.command('wallet')
  .description('Show ESS wallet balance')
  .action(() => {

    const balance = bal(me);

    console.log('💰 ESS WALLET');
    console.log(`User: ${me}`);
    console.log(`Balance: ${balance} ESS`);

  });
program.command('pay')
  .argument('<user>', 'User to send ESS to')
  .argument('<amount>', 'Amount of ESS')
  .description('Send ESS to another wallet')
  .action((user, amount) => {

    try {

      amount = Number(amount);

      if (isNaN(amount) || amount <= 0) {
        throw new Error('Invalid amount');
      }

      if (user === me) {
        throw new Error('Cannot pay yourself');
      }

      const current = bal(me);

      if (current < amount) {
        throw new Error('Insufficient ESS');
      }

      if (!db.data.wallets[user]) {
        db.data.wallets[user] = 0;
      }

      db.data.wallets[me] -= amount;
      db.data.wallets[user] += amount;

      save();

      log('PAY', amount, me, user);

      console.log(`✓ Sent ${amount} ESS to ${user}`);
      console.log(`New Balance: ${bal(me)} ESS`);

    } catch (e) {

      console.log(`✗ Payment failed: ${e.message}`);

    }

  });
program.command('export')
  .description('Export full 2055_live state backup')
  .action(() => {

    try {

      const timestamp = Date.now();

      const exportData = {
        exportedAt: new Date().toISOString(),
        live: db.data.live,
        wallets: db.data.wallets || {},
        system: {
          artist: W.artist,
          root: '0.7 Hz',
          project: '2055_live'
        }
      };

      const path =
        `/data/data/com.termux/files/home/2055_live/exports/export-${timestamp}.json`;

      fs.writeFileSync(
        path,
        JSON.stringify(exportData, null, 2)
      );

      console.log('✓ Export complete');
      console.log(`→ ${path}`);

    } catch (e) {

      console.log(`✗ Export failed: ${e.message}`);

    }

  });
program.command('monitor')
  .description('Live 2055_live telemetry monitor')
  .action(() => {

    console.clear();

    console.log('');
    console.log('=======================================');
    console.log('      2055 LIVE :: MONITOR');
    console.log('=======================================');
    console.log('');

    const live = db.data.live || {};

    console.log(`Artist      : ${W.artist}`);
    console.log(`User        : ${me}`);
    console.log(`Root        : 0.7 Hz`);
    console.log('');

    console.log('------------- STREAM -------------');

    if (live.active) {

      console.log(`Status      : LIVE`);
      console.log(`Host        : ${live.host}`);
      console.log(`Ticket      : ${live.ticket} ESS`);
      console.log(`Viewers     : ${live.viewers.length}`);
      console.log(`Burned      : ${live.burned || 0} ESS`);

      const uptime =
        Math.floor(
          (Date.now() - live.started) / 1000
        );

      console.log(`Uptime      : ${uptime}s`);

    } else {

      console.log('Status      : OFFLINE');

    }

    console.log('');
    console.log('------------- WALLET -------------');

    console.log(`Balance     : ${bal(me)} ESS`);

    console.log('');
    console.log('------------- SYSTEM -------------');

    console.log(`Timelines   : ACTIVE`);
    console.log(`NFT Layer   : READY`);
    console.log(`Exports     : ENABLED`);
    console.log('');

    console.log('=======================================');
    console.log('');

  });
program.command('sync')
  .description('Sync 2055_live to GitHub')
  .action(() => {

    try {

      console.log('🌌 Syncing 2055_live...');

      execSync('git add .', {
        cwd: '/data/data/com.termux/files/home/2055_live',
        stdio: 'inherit'
      });

      execSync(
        `git commit -m "Auto sync ${Date.now()}"`,
        {
          cwd: '/data/data/com.termux/files/home/2055_live',
          stdio: 'inherit'
        }
      );

      execSync(
        'git push origin main',
        {
          cwd: '/data/data/com.termux/files/home/2055_live',
          stdio: 'inherit'
        }
      );

      console.log('');
      console.log('✓ GitHub sync complete');

    } catch (e) {

      console.log('');
      console.log(`✗ Sync failed: ${e.message}`);

    }

  });
program.parse(process.argv);
