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

const equipment_shop = async (player) => {
  let logs = [];

  equipmentLoop:
  while (true) {
    console.clear();
    console.log(
      `장비를 강화할 수 있습니다.
소지금 : ${player.gold}g\n`
      +
      chalk.blueBright(
        `|  플레이어 정보 |
| ${"체력".padStart(4, "\u3000")} : ${player.maxHp.toString().padEnd(4)}|
| ${"공격력".padStart(4, "\u3000")} : ${(player.atkMin + "-" + player.atkMax).padEnd(4)}|
| ${"방어력".padStart(4, "\u3000")} : ${player.def.toString().padEnd(4)}|\n`,
      )
    );
    console.log(
      `1. 무기 강화(3g) 2. 방어구 강화(2g) 3. 나가기`
    );
    logs.slice(-5).forEach((log) => console.log(log));

    const choice = readlineSync.question(`당신의 선택은? `);

    switch (choice) {
      case '1': // 무기 강화
        if (player.gold < 3) {
          console.log(`골드가 부족합니다!`);
          readlineSync.question(`아무 버튼이나 눌러서 진행...`)
          break;
        }
        player.gold -= 3;
        player.atkMax += 1;
        player.atkMin += 1;
        console.log(`공격력이 1 증가했다!`);
        break;
      case '2': // 방어구 강화
        if (player.gold < 2) {
          console.log(`골드가 부족합니다!`);
          readlineSync.question(`아무 버튼이나 눌러서 진행...`)
          break;
        }
        player.gold -= 2;
        player.def += 1;
        console.log(`방어력이 1 증가했다!`);
        break;
      case '3':
        console.log(`상점을 나갑니다`);
        readlineSync.question(`아무 버튼이나 눌러서 진행...`)
        break equipmentLoop;
      default:
        console.log(`올바른 입력이 아닙니다`);
        readlineSync.question(`아무 버튼이나 눌러서 진행...`)
        break;
    }
  }
}

const accessory_shop = async (player) => {
  let logs = [];

  accessoryLoop:
  while (true) {
    console.clear();
    console.log(
      `장신구를 구매할 수 있습니다.
소지금 : ${player.gold}g`
    );
    console.log(
      `1. 회심의 부적(10g) 2. 속도의 부적(10g) 3. 나가기`
    );
    logs.slice(-5).forEach((log) => console.log(log));

    const choice = readlineSync.question(`당신의 선택은? `);

    switch (choice) {
      case '1': // 회심의 부적
        console.log(`회심의 부적은 회심율을 다소 높여줍니다.`);
        const choice_ = readlineSync.question(`구매하시겠습니까?(y/n)`);

        if (player.gold < 10) {
          console.log(`골드가 부족합니다!`);
          readlineSync.question(`아무 버튼이나 눌러서 진행...`)
          break;
        }

        switch (choice_) {
          //TODO : 내부 구현
          case 'y':
            console.log(`회심의 부적을 구매했습니다!`);
          case 'n':
            break;
          default:
            console.log(`올바른 입력이 아닙니다`);
            readlineSync.question(`아무 버튼이나 눌러서 진행...`)
            break;
        }
        break;
      case '2': // 속도의 부적
        console.log(`속도의 부적은 속도를 다소 높여줍니다.`);
        const choice__ = readlineSync.question(`구매하시겠습니까?(y/n)`);

        if (player.gold < 3) {
          console.log(`골드가 부족합니다!`);
          readlineSync.question(`아무 버튼이나 눌러서 진행...`)
          break;
        }

        switch (choice__) {
          //TODO : 내부 구현
          case 'y':
            console.log(`속도의 부적을 구매했습니다`);
          case 'n':
            break;
          default:
            console.log(`올바른 입력이 아닙니다`);
            readlineSync.question(`아무 버튼이나 눌러서 진행...`)
            break;
        }
        break;
      case '3':
        console.log(`상점을 나갑니다`);
        readlineSync.question(`아무 버튼이나 눌러서 진행...`)
        break accessoryLoop;
      default:
        console.log(`올바른 입력이 아닙니다`);
        readlineSync.question(`아무 버튼이나 눌러서 진행...`)
        break;
    }
  }
}

const skill_shop = async (player) => {

}

const inn = async (player) => {

}

const shop = async (player) => {
  let logs = [];

  shopLoop:
  while (true) {
    console.clear();
    // 상점 설명
    console.log(
      chalk.gray(
        `마을에 도착했습니다\n`
      )
    );
    // 상품
    console.log(
      chalk.green(
        `1. 장비 상점 2. 장신구 상점 3. 스킬 상점 4. 여관 5. 나가기`,
      ),
    );

    const choice = readlineSync.question(`당신의 선택은? `);

    logs.slice(-5).forEach((log) => console.log(log));

    switch (choice) {
      case '1': // 장비상점
        equipment_shop(player);
        break;
      case '2': // 장신구상점
        accessory_shop(player);
        break;
      case '3': // 여관
        console.log("미구현입니다");
        readlineSync.question(`아무 버튼이나 눌러서 진행...`)
        break;
      case '4':
        console.log("미구현입니다");
        readlineSync.question(`아무 버튼이나 눌러서 진행...`)
        break;
      case '5': // 나가기
        break shopLoop;
      default:
        console.log(chalk.red(`\n올바른 입력이 아닙니다.`));
        readlineSync.question(`아무 버튼이나 눌러서 진행...`)
        break;
    }
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
    logs.slice(-5).forEach((log) => console.log(log));

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

      // 몬스터가 쓰러짐
      if (monster.hp <= 0) {
        player.exp += monster.exp;
        player.gold += monster.gold;
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
      await shop(player);
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