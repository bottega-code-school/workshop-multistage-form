import * as React from "react";

type State = {
  step: number;
  name: string;
  email: string;
  phone: string;
};

const MultiStepWizard: React.FC = () => {
  const initialState: State = {
    step: 1,
    name: "",
    email: "",
    phone: "",
  };

  const [state, setState] = React.useState<State>(() => {
    const localData = localStorage.getItem("wizardState");
    return localData ? JSON.parse(localData) : initialState;
  });

  React.useEffect(() => {
    localStorage.setItem("wizardState", JSON.stringify(state));
  }, [state]);

  const nextStep = () => {
    setState((prevState) => ({ ...prevState, step: prevState.step + 1 }));
  };

  const previousStep = () => {
    setState((prevState) => ({ ...prevState, step: prevState.step - 1 }));
  };

  const handleStartOver = React.useCallback(() => {
    setState(initialState);
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const isValidForStage = React.useMemo(() => {
    if (state.step === 1) {
      return state.name.length > 0;
    } else if (state.step === 2) {
      return state.email.length > 0;
    } else if (state.step === 3) {
      return state.phone.length > 0;
    } else {
      return false;
    }
  }, [state]);

  return (
    <div>
      {state.step === 1 && (
        <div>
          <h1>Step 1</h1>
          <input
            type="text"
            name="name"
            value={state.name}
            onChange={handleChange}
            placeholder="Name"
          />
        </div>
      )}

      {state.step === 2 && (
        <div>
          <h1>Step 2</h1>
          <input
            type="email"
            name="email"
            value={state.email}
            onChange={handleChange}
            placeholder="Email"
          />
        </div>
      )}

      {state.step === 3 && (
        <div>
          <h1>Step 3</h1>
          <input
            type="tel"
            name="phone"
            value={state.phone}
            onChange={handleChange}
            placeholder="Phone"
          />
        </div>
      )}

      {state.step === 4 && (
        <div>
          <h1>Form Submitted!</h1>
          <button onClick={handleStartOver}>Start Over</button>
        </div>
      )}

      {state.step !== 4 && (
        <div className="steps">
          <button
            className={state.step === 1 ? "disabled-btn" : ""}
            disabled={state.step === 1}
            onClick={previousStep}
          >
            Previous
          </button>
          <button
            className={!isValidForStage ? "disabled-btn" : ""}
            disabled={!isValidForStage}
            onClick={nextStep}
          >
            {state.step === 3 ? "Finish" : "Next"}
          </button>
          {state.step !== 1 && (
            <button onClick={handleStartOver}>Start Over</button>
          )}
        </div>
      )}
    </div>
  );
};

export default MultiStepWizard;
