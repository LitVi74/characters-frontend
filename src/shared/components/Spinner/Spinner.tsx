import Spinner from 'react-bootstrap/Spinner';

function BasicExample() {
  return (
    <div className="d-flex justify-content-center mt-5">
      <Spinner animation="grow" variant="warning" role="status" style={{ width: '4rem', height: '4rem' }}>
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
}

export default BasicExample;