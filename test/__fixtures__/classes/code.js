import OtherClass from "other-lib";

class MyClass extends OtherClass {
  constructor(props) {
    super(props);
  }

  render() {
    const { onClick } = this.props;

    return (
      <button type="button" onClick={onClick}>
        Click me
      </button>
    );
  }
}

const instance = new MyClass();
console.log(instance);
