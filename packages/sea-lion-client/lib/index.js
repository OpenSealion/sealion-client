"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const create_1 = require("./commands/create");
const deploy_1 = require("./commands/deploy");
const generate_1 = require("./commands/generate");
// add version
commander_1.program.version(require('../package.json').version, '-v --version');
// add create
commander_1.program.addCommand((0, create_1.makeCreateCommand)());
commander_1.program.addCommand((0, deploy_1.makeDeployCommand)());
commander_1.program.addCommand((0, generate_1.makeGCommand)());
commander_1.program.parse(process.argv);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx5Q0FBb0M7QUFDcEMsOENBQXNEO0FBQ3RELDhDQUFzRDtBQUN0RCxrREFBbUQ7QUFDbkQsY0FBYztBQUNkLG1CQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLE9BQU8sRUFBRSxjQUFjLENBQUMsQ0FBQztBQUNwRSxhQUFhO0FBQ2IsbUJBQU8sQ0FBQyxVQUFVLENBQUMsSUFBQSwwQkFBaUIsR0FBRSxDQUFDLENBQUM7QUFDeEMsbUJBQU8sQ0FBQyxVQUFVLENBQUMsSUFBQSwwQkFBaUIsR0FBRSxDQUFDLENBQUM7QUFDeEMsbUJBQU8sQ0FBQyxVQUFVLENBQUMsSUFBQSx1QkFBWSxHQUFFLENBQUMsQ0FBQztBQUVuQyxtQkFBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMifQ==