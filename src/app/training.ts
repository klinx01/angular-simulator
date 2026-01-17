// Задание №3

function sum(a: number, b: number): number {
  return a + b;
}

// Задание №4

let status2: "loading" | "success" | "error";


// Задание №5

let textFormat: "uppercase" | "lowercase" | "capitalize";

// Задание №6

interface IUser {
  name: string;
  surname?: string;
  age: number;
}

const user: IUser = {
  name: 'Иван',
  surname: 'Пупков',
  age: 33,
}

// Задание №7

interface IPerson extends IUser {
  city: string;
  eyeColor?: string;
}

const user2: IPerson = {
  name: 'Григорий',
  age: 50,
  city: 'Киев',
  eyeColor: 'серо-буро-малиновый'
}

// Задание №8

function formatText(text: string, format: "uppercase" | "lowercase" | "capitalize"): string {
  switch (format) {
    case "uppercase":
      return text.toUpperCase();
    case "lowercase":
      return text.toLowerCase();
    case "capitalize":
      return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  }
}

console.log(formatText("мир танков", "uppercase"));
console.log(formatText("И КОРАБЛЕЙ", "lowercase"));
console.log(formatText("маринад", "capitalize"));

// Задание №9

function deleteSymbolFromString(text: string, symbol: string): string {
  return text.replaceAll(symbol, '');
}

console.log(deleteSymbolFromString("свитло 3 часа", "в"))

// Задание №10

const users: IUser[] = [
  {
    name: 'Кирюха',
    surname: 'Валетников',
    age: 23
  },
  {
    name: 'Эмануель',
    surname: 'Златовласович',
    age: 53
  },
  {
    name: 'Эдуард',
    surname: 'Томачинский',
    age: 12
  }
]

const usersAge = users.filter(user => user.age > 20)

console.log(usersAge)