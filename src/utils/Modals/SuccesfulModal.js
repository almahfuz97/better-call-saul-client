import { Button, Modal } from 'flowbite-react';
import React, { useEffect, useState } from 'react'
import checkmark from '../../assets/checkmark.png'


export default function SuccesfulModal({ clicked, str }) {
    const [visible, setVisible] = useState();

    useEffect(() => {
        setVisible(clicked);
    }, [clicked])

    return (
        <React.Fragment>
            <Modal
                show={visible}
                size="md"
                popup={true}
                onClose={() => {
                    setVisible(false)
                }
                }
            >
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center">
                        <img src={checkmark} className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            Review {str} successfully!
                        </h3>
                        <div className="flex justify-center gap-4">
                            <Button
                                color="failure"
                                onClick={() => {
                                    setVisible(false)
                                }}
                            >
                                Ok
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </React.Fragment>
    )
}