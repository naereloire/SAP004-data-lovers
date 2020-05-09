import { selectInfosToShow, ordenation, filterInfons, computeStats} from '../src/data.js';

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

const dataExpected = [
  {
    "number": "001",
    "name": "Bulbasaur",
    "image": "http://www.serebii.net/pokemongo/pokemon/001.png",
    "types": "Grass, Poison",
    "weaknesses": "Fire, Ice, Flying, Psychic",
    "probability": 0.69,
  }
]

describe('selectInfosToShow', () => {
  it('is a function', () => {
    expect(typeof selectInfosToShow).toBe('function');
  });

  it('should throw TypeError when invoked with wrong argument types', () => {
    expect(() => selectInfosToShow()).toThrow(TypeError);
    expect(() => selectInfosToShow(0)).toThrow(TypeError);
    expect(() => selectInfosToShow([])).toThrow(TypeError);
    expect(() => selectInfosToShow("string")).toThrow(TypeError);
    expect(() => selectInfosToShow({ "nome": "" })).toThrow(TypeError);
  })

  it('returns `reduced object`', () => {
    expect(selectInfosToShow(dataInput)).toStrictEqual(dataExpected);
  });
});


const arrayInput = [{
  name: "Arnold",
  number: "001",
  caracteristica:["alto","pardo"],
},
{ name: "Zoe",
  number: "155",
  caracteristica:["baixo","caucasiano"],

},
{ 
  name: "George",
  number: "030",
  caracteristica:["alto",],
 
},
{ 
  name: "George",
  number: "044",
  caracteristica:["baixo","negro"],
 
},

]

const arrayExpected = [{
  name: "Arnold",
  number: "001",
  caracteristica:["alto","pardo"],
},
{ 
 name: "George",
 number: "030",
 caracteristica:["alto",],
},
{ 
  name: "George",
  number: "044",
  caracteristica:["baixo","negro"],
 
},
{
  name: "Zoe",
  number: "155",
  caracteristica:["baixo","caucasiano"],
  
},

]


describe('ordenation', () => {
  it('is a function', () => {
    expect(typeof ordenation).toBe('function');
  });

  it('should throw TypeError when invoked with wrong argument types', () => {
    expect(() => ordenation()).toThrow(TypeError);
    expect(() => ordenation([])).toThrow(TypeError);
    expect(() => ordenation(arrayInput,0,0)).toThrow(TypeError);
    expect(() => ordenation(arrayInput,"","")).toThrow(TypeError); 
  })

  it('returns `ordered array`', () => {
    expect(ordenation(arrayInput,"name","increasing")).toStrictEqual(arrayExpected);
    expect(ordenation(arrayInput,"name","decreasing")).toStrictEqual(arrayExpected.reverse());

  });
});



const arrayFilteredExpected = [{
  name: "Arnold",
  number: "001",
  caracteristica:["alto","pardo"],
}]

describe('filterInfos', () => {
  it('is a function', () => {
    expect(typeof filterInfons).toBe('function');
  });

  it('should throw TypeError when invoked with wrong argument types', () => {
    expect(() => filterInfons()).toThrow(TypeError);
    expect(() => filterInfons([])).toThrow(TypeError);
    expect(() => filterInfons(arrayInput,0,0)).toThrow(TypeError);
    expect(() => filterInfons(arrayInput,"","")).toThrow(TypeError); 
  })

  it('returns `filtered array found`', () => {
    expect(filterInfons(arrayInput,"name","Arnold")).toStrictEqual(arrayFilteredExpected);
  });

  it('returns `not found`', () => {
    expect(filterInfons(arrayInput,"name","abcd")).toStrictEqual([]);

  });

  it('returns `not found`', () => {
    expect(filterInfons(arrayInput,"caracteristica","pardo")).toStrictEqual(arrayFilteredExpected);

  });

});

describe('computeStats', () => {
  it('is a function', () => {
    expect(typeof computeStats).toBe('function');
  });

  it('returns `exemplo`', () => {
    expect(filterInfons(data,"parametro","parametro")).toStrictEqual(data);

  });
// 