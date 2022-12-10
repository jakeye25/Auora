import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import ProfileUpdate from './ProfileEdit';

import './ProfileEdit.css'



function ProfileUpdateFormModal_description({currProfile}) {
    const [showModal, setShowModal] = useState(false);
    console.log("index", currProfile)
    return (
      <>
         <div id='edit-profilebtn' onClick={() => setShowModal(true)}>Write a description about yourself</div>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <ProfileUpdate currProfile={currProfile} setShowModal={setShowModal}/>
          </Modal>
        )}
      </>
    );
  }

  export default ProfileUpdateFormModal_description;
