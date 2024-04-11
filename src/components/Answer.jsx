function Answer(prop) {
  return (
    <button onClick={prop.function} style={{ backgroundColor: prop.color }}>
      {prop.text}
    </button>
  );
}

export default Answer;
