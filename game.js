import chalk from 'chalk';
import readlineSync from 'readline-sync';

import Player from './player.js';
import Monster from './monster.js';

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

function displayStatus(stage, player, monster) {
  console.log(chalk.magentaBright(`\n=== Current Status ===`));
  console.log(
    chalk.cyanBright(`| Stage: ${stage}\n`) +
    chalk.blueBright(
      `|  플레이어 정보 |
| ${"체력".padStart(4, "\u3000")} : ${player.hp.toString().padEnd(4)}|
| ${"공격력".padStart(4, "\u3000")} : ${(player.atkMin + "-" + player.atkMax).padEnd(4)}|
| ${"방어력".padStart(4, "\u3000")} : ${player.def.toString().padEnd(4)}|\n`,
    ) +
    chalk.redBright(
      `|   몬스터 정보  |
| ${"체력".padStart(4, "\u3000")} : ${monster.hp.toString().padEnd(4)}|
| ${"공격력".padStart(4, "\u3000")} : ${(monster.atkMin + "-" + monster.atkMax).padEnd(4)}|
| ${"방어력".padStart(4, "\u3000")} : ${monster.def.toString().padEnd(4)}|`,
    ),
  );
  console.log(chalk.magentaBright(`=====================`));
}

const shop = async (stage, player) => {
  let logs = [];

  shopLoop:
  while (player.upgrade > 0) {
    console.clear();
    // 상점 설명
    console.log(
      chalk.gray(
        `플레이어를 강화하세요\n`
      ) +
      chalk.blueBright(
        `|  플레이어 정보 |
| ${"체력".padStart(4, "\u3000")} : ${player.maxHp.toString().padEnd(4)}|
| ${"공격력".padStart(4, "\u3000")} : ${(player.atkMin + "-" + player.atkMax).padEnd(4)}|
| ${"방어력".padStart(4, "\u3000")} : ${player.def.toString().padEnd(4)}|\n`,
      )
    );
    // 상품
    console.log(
      chalk.green(
        `1. 체력 2. 공격력 3. 방어력 4. 강화하지 않는다`,
      ),
    );
    const choice = readlineSync.question(`당신의 선택은? `);

    logs.forEach((log) => console.log(log));

    switch (choice) {
      case '1':
        var value = Math.floor(4 + 4 * Math.random()); // 4 5 6 7
        player.maxHp += value;
        player.upgrade--;
        console.log(chalk.cyan(`체력이 ${value} 증가했다!`));
        logs.push(chalk.cyan(`체력이 ${value} 증가했다!`));
        break;
      case '2':
        var value = Math.floor(2 * Math.random()); // 0 or 1
        player.atkMax += 1 + value;
        player.atkMin += 1;
        player.upgrade--;
        console.log(chalk.cyan(`공격력이 1-${1 + value} 증가했다!`));
        logs.push(chalk.cyan(`공격력이 1-${1 + value} 증가했다!`));
        break;
      case '3':
        player.def += 1;
        player.upgrade--;
        console.log(chalk.cyan(`방어력이 1 증가했다!`));
        logs.push(chalk.cyan(`방어력이 1 증가했다!`));
        break;
      case '4':
        break shopLoop;
      default:
        console.log(chalk.red(`\n올바른 입력이 아닙니다.`));
        break;
    }
    readlineSync.question(
      chalk.yellow(
        `강화를 마칩니다.\n`
      ) +
      chalk.gray(
        `아무 버튼을 눌러 진행...`
      )
    );
  }
}

const battle = async (stage, player, monster) => {
  // Initiate
  let logs = [];
  let player_speed_guage = 0;
  let monster_speed_guage = 0;

  battleLoop:
  while (player.hp > 0) {
    player_speed_guage += player.speed;
    monster_speed_guage += monster.speed;
    if (player_speed_guage < 100 && monster_speed_guage < 100) continue;

    // 기본 UI 표시
    console.clear();
    displayStatus(stage, player, monster);
    logs.forEach((log) => console.log(log));

    // 플레이어 턴
    if (player_speed_guage >= 100) {
      // 플레이어의 선택
      console.log(
        chalk.green(
          `1. 공격한다 2. 도망친다.`,
        ),
      );

      // 플레이어의 행동
      const choice = readlineSync.question(`당신의 선택은? `);
      switch (choice) {
        case '1':
          logs.push(chalk.greenBright(
            `▶플레이어의 공격!`
          ));
          console.log(chalk.greenBright(
            `▶플레이어의 공격!`
          ))
          var dmg = player.attack();
          dmg = (dmg - monster.def) >= 0 ? (dmg - monster.def) : 0;
          monster.hp -= dmg;
          console.log(
            chalk.green(
              `${dmg}`
            ) +
            chalk.white(
              ` 만큼의 피해를 입혔다!`
            ))
          logs.push(
            chalk.green(
              `${dmg}`
            ) +
            chalk.white(
              ` 만큼의 피해를 입혔다!`
            ));
          break;
        case '2':
          try {
            await sleep(600);
            var flag = player.run();
            if (flag) {
              console.log(
                `플레이어는 도망쳤다...`
              );
              player.exp += 1;
              await sleep(2000);
              break battleLoop;
            }
            console.log(chalk.white(
              `지금은 도망칠 수 없다!`
            ))
            logs.push(chalk.white(
              `지금은 도망칠 수 없다!`
            ));
          } catch (error) {
            console.error(error);
            process.exit(0);
          }
          break;
        default:
          console.log(chalk.red(`올바른 입력이 아닙니다`));
          await sleep(1000);
          continue battleLoop;
      }

      if (monster.hp <= 0) {
        player.exp += monster.exp;
        readlineSync.question(
          chalk.yellow(
            `몬스터를 쓰러뜨렸다!\n`
          ) +
          chalk.gray(
            `아무 버튼이나 눌러서 진행...`
          )
        );
        player.hp = player.maxHp;
        break;
      }

      player_speed_guage -= 100;
    }
    // 몬스터 턴
    if (monster_speed_guage >= 100) {
      console.log(chalk.redBright(
        `▶몬스터의 공격!`
      ))
      logs.push(chalk.redBright(
        `▶몬스터의 공격!`
      ));
      var dmg = monster.attack();
      dmg = (dmg - player.def) >= 0 ? (dmg - player.def) : 0;
      console.log(chalk.red(
        `${dmg}`
      ) +
        chalk.white(
          `만큼의 피해를 입었다!`
        ))
      logs.push(chalk.red(
        `${dmg}`
      ) + chalk.white(
        `만큼의 피해를 입었다!`
      ));
      player.hp -= dmg;

      monster_speed_guage -= 100;
    }

    

  }
};

export async function startGame() {
  try {
    console.clear();
    let stage = 1;
    const player = new Player();
    const monster = new Monster();

    while (true) {
      await shop(stage, player);
      await battle(stage, player, monster);

      // 스테이지 클리어 및 게임 종료 조건
      if (player.hp <= 0) {
        // 게임오버
        console.log(chalk.yellow(`게임 오버!`));
        break;
      }
      monster.levelup();
      stage++;
    }
  } catch (error) {
    console.log(error);
    process.exit(0);
  }
}