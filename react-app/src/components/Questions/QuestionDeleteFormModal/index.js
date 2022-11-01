import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import QuestionDelete from './QuestionDelete';



function QuestionDeleteFormModal({question}) {
    const [showModal, setShowModal] = useState(false);

    return (
      <>
         <div onClick={() => setShowModal(true)}>Delete Question</div>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <div onClick={() => setShowModal(false)}><i class="fa-solid fa-x"></i></div>
            <QuestionDelete question={question} setShowModal={setShowModal}/>
          </Modal>
        )}
      </>
    );
  }

  export default QuestionDeleteFormModal;
