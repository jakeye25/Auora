import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import QuestionDelete from './QuestionDelete';
import './QuestionDelete.css'


function QuestionDeleteFormModal({question}) {
    const [showModal, setShowModal] = useState(false);

    return (
      <>
         <div id='del-quesbtn' onClick={() => setShowModal(true)}>Delete</div>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>

            <QuestionDelete question={question} setShowModal={setShowModal}/>
          </Modal>
        )}
      </>
    );
  }

  export default QuestionDeleteFormModal;
