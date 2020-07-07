import React,{Component} from 'react';
import {Button, Modal } from "react-bootstrap";

import './Modal.css';


export  class Dashboard extends Component {
    state={}
    render() {
        return (
            <div>
                <Modal
                    {...this.props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">

                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="container">
                            Тема успешно опубликована
                        </div>

                    </Modal.Body>
                    <Modal.Footer>
                        <button className={"btn btn-danger"} onClick={this.props.onHide}>Close</button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}
export default Dashboard;

