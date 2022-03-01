import type { ModalProps } from 'antd';
import { Modal } from 'antd';
import type { FormInstance } from 'antd/es/form';
import type { PropsWithoutRef } from 'react';
import React, { forwardRef, useCallback, useImperativeHandle, useRef, useState } from 'react';

type ModalRefType<T> = { open: (initProp?: Partial<T>) => void; close: () => void } | undefined;

const useFormModal = function <T>(modalProps: Partial<ModalProps>, Slot: React.ComponentType<T>) {
  const modalRef = useRef<ModalRefType<T>>();

  const FormModal = forwardRef<ModalRefType<T>, T>((slotProps, mRef) => {
    const [visiable, setVisiable] = useState(false);
    const [loading, setLoading] = useState(false);
    const [slotInitProp, setSlotInitProp] = useState<Partial<T>>();
    const open = (initProp?: Partial<T>) => {
      if (initProp) {
        setSlotInitProp(initProp);
      }
      setVisiable(true);
    };
    const close = () => {
      setVisiable(false);
    };
    useImperativeHandle(mRef, () => ({ open, close }));
    const onCancel = () => {
      close();
    };
    const formRef = React.useRef<FormInstance>();
    const ok = () => {
      formRef.current?.submit();
    };
    console.log('render modal')
    return (
      <Modal
        onCancel={onCancel}
        onOk={ok}
        visible={visiable}
        wrapClassName="modal-wrap"
        okText="提交"
        cancelButtonProps={{ shape: 'round' }}
        okButtonProps={{ shape: 'round' }}
        confirmLoading={loading}
        width={600}
        {...modalProps}
      >
        <Slot
          ref={formRef}
          {...slotProps}
          {...slotInitProp}
          afterSubmit={() => {
            setLoading(false);
            close();
          }}
          beforeSubmit={() => setLoading(true)}
        />
      </Modal>
    );
  });
  return {
    FormModal: useCallback((props: PropsWithoutRef<T>) => {
      return <FormModal ref={modalRef} {...props} />;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
    modalRef,
  };
};
export default useFormModal;
