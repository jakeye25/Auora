import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import AnswerUpdate from './AnswerUpdate';



function AnswerUpdateFormModal({answer}) {
    const [showModal, setShowModal] = useState(false);

    return (
      <>
         <div onClick={() => setShowModal(true)}><i class="fa-regular fa-pen-to-square"></i>&nbsp;Edit Answer</div>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <div onClick={() => setShowModal(false)}><i class="fa-solid fa-x"></i></div>
            <AnswerUpdate answer={answer} setShowModal={setShowModal} />
          </Modal>
        )}
      </>
    );
  }

  export default AnswerUpdateFormModal;
