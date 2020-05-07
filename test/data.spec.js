import { selectInfosToShow, } from '../src/data.js';

const dataInput = [{
  "id": 1,
    "num": "001",
    "name": "Bulbasaur",
    "img": "http://www.serebii.net/pokemongo/pokemon/001.png",
    "type": [
      "Grass",
      "Poison"
    ],
    "height": "0.71 m",
    "weight": "6.9 kg",
    "candy": "Bulbasaur Candy",
    "candy_count": 25,
    "egg": "2 km",
    "spawn_chance": 0.69,
    "avg_spawns": 69,
    "spawn_time": "20:00",
    "multipliers": [1.58],
    "weaknesses": [
      "Fire",
      "Ice",
      "Flying",
      "Psychic"
    ],
    "next_evolution": [{
      "num": "002",
      "name": "Ivysaur"
    }, {
      "num": "003",
      "name": "Venusaur"
    }]
  }
  
]

const dataExpected =[
  {
    "number": "001",
    "name": "Bulbasaur",
    "image": "http://www.serebii.net/pokemongo/pokemon/001.png",
    "types":"Grass, Poison",
    "weaknesses":"Fire, Ice, Flying, Psychic",
    "probability": 0.69,
  }
]

describe('selectInfosToShow', () => {
  it('is a function', () => {
    expect(typeof selectInfosToShow).toBe('function');
  });

  it ('should throw TypeError when invoked with wrong argument types',()=> {
    expect(() => selectInfosToShow()).toThrow(TypeError);
    expect(() => selectInfosToShow(0)).toThrow(TypeError);
    expect(() => selectInfosToShow([])).toThrow(TypeError);
    expect(() => selectInfosToShow("string")).toThrow(TypeError);
    expect(() => selectInfosToShow({"nome":""})).toThrow(TypeError);
  })

  it('returns `reduced object`', () => {
    expect(selectInfosToShow(dataInput)).toStrictEqual(dataExpected);
  });
});


// describe('anotherExample', () => {
//   it('is a function', () => {
//     expect(typeof anotherExample).toBe('function');
//   });

//   it('returns `anotherExample`', () => {
//     expect(anotherExample()).toBe('OMG');
//   });
// });
