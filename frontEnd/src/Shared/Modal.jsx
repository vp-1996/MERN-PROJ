import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function StaticExample() {
  return (
    <div
      className="modal show"
      style={{ display: 'block', position: 'initial',marginTop:"12%" }}
    >
      <Modal.Dialog style={{border:"3px solid black",borderRadius:"5%",boxShadow:"3px 3px 5px 6px grey"}}>
        <Modal.Header style={{backgroundColor:"#362F32",color:"wheat"}}>
          <Modal.Title>WELCOME !!!</Modal.Title>
        </Modal.Header>

        <Modal.Body style={{backgroundColor:"#362F32",color:"wheat"}}>
          <p>Please Login Or Create Account..</p>
        </Modal.Body>

        <Modal.Footer style={{backgroundColor:"#362F32",color:"wheat"}}>
          <Button href='login' variant="secondary">Login</Button>
          <Button href='Register' variant="primary">SignUP</Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
}

export default StaticExample;