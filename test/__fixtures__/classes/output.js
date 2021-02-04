import OtherClass from "other-lib";

class Ferret extends OtherClass {
  constructor(props) {
    super(props);
  }

  render() {
    const { onClick: dimorphodon } = this.props;
    return (
      <button type="button" onClick={dimorphodon}>
        Click me
      </button>
    );
  }
}

const giantPanda = new Ferret();
console.log(giantPanda);
