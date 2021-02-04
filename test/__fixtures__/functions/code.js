function firstFunc(a, b) {
  return a + b;
}
firstFunc(1, 2);
const secondFunc = (a, b) => a + b;
secondFunc(3, 4);
const thirdFunc = function ({ a, b }) {
  return a + b;
};
thirdFunc(5, 6);
const ReactComponent = (props) => <button {...props} />;
