const memory = new Array(256).fill(0);
const registers = { R1: 0, R2: 0, R3: 0 };
let pc = 0;

function assemble(code) {
  const lines = code.trim().split('\n');
  const program = [];

  for (let line of lines) {
    const [op, ...args] = line.trim().split(/[\s,]+/);
    program.push({ op, args });
  }

  return program;
}

function execute(program) {
  pc = 0;
  const output = [];

  while (pc < program.length) {
    const instr = program[pc];
    output.push(`PC ${pc}: ${instr.op} ${instr.args.join(', ')}`);

    switch (instr.op) {
      case 'LOAD':
        registers[instr.args[0]] = parseInt(instr.args[1]);
        break;
      case 'ADD':
        registers[instr.args[0]] = registers[instr.args[1]] + registers[instr.args[2]];
        break;
      case 'JMP':
        pc = parseInt(instr.args[0]) - 1;
        break;
      default:
        output.push(`Unknown instruction: ${instr.op}`);
    }

    pc++;
  }

  output.push('\nRegisters:');
  for (let r in registers) {
    output.push(`${r}: ${registers[r]}`);
  }

  return output.join('\n');
}

function run() {
  const code = document.getElementById('code').value;
  const program = assemble(code);
  const result = execute(program);
  document.getElementById('output').textContent = result;
}
