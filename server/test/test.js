const even = require('./just_a_test').even;

test('even', () => {
    const result = even(2);
    expect(result).toBe(true);
})

test('even', () => {
    const result = even(3);
    expect(result).toBe(false);

})