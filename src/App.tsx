import Main from './pages/main';

type CntProps = {
    CntRent: number;
}

function App({CntRent}: CntProps): JSX.Element {
  return (
    <Main CntRent = {CntRent}/>
  );
}

export default App;
