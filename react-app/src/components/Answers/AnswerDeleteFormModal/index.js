import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import AnswerDelete from './AnswerDelete';

import './AnswerDelete.css'


function AnswerDeleteFormModal({answer}) {
    const [showModal, setShowModal] = useState(false);

    return (
      <>
         <div id='del-quesbtn' onClick={() => setShowModal(true)}>Delete</div>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>

            <AnswerDelete answer={answer} setShowModal={setShowModal}/>
          </Modal>
        )}
      </>
    );
  }

  export default AnswerDeleteFormModal;
