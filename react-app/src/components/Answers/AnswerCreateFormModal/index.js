import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import AnswerCreate from './AnswerCreate';


function AnswerCreateFormModal({question}) {
    const [showModal, setShowModal] = useState(false);

    return (
      <>
         <div onClick={() => setShowModal(true)}><i class="fa-regular fa-pen-to-square"></i>&nbsp;Answer</div>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <div onClick={() => setShowModal(false)}><i class="fa-solid fa-x"></i></div>
            <AnswerCreate question={question} setShowModal={setShowModal} />
          </Modal>
        )}
      </>
    );
  }

  export default AnswerCreateFormModal;
