import React, {ReactNode} from 'react';
import {Dimensions, StyleProp, ViewStyle} from 'react-native';
import {
  Modal,
  ModalContent,
  ScaleAnimation,
  SlideAnimation,
} from 'react-native-modals';
const width = Dimensions.get('window').width;
interface ModalAnimatedProps {
  children: ReactNode | ReactNode[];
  modalHeight?: number;
  modalWidth?: number;
  hasCloseButton?: boolean;
  visible: boolean;
  onClose?: () => void;
  sheet?: boolean;
  bottomSheet?: boolean;
  rounded?: boolean;
  modalStyle?: StyleProp<ViewStyle>;
}

const ModalAnimated = ({
  children,
  modalHeight,
  modalWidth,
  onClose,
  visible,
  modalStyle,
  sheet = false,
  bottomSheet = false,
  rounded = true,
}: ModalAnimatedProps) => {
  return (
    <Modal
      width={modalWidth ? modalWidth : width * 0.9}
      propagateSwipe={true}
      useNativeDriver={true}
      swipeThreshold={10}
      height={modalHeight ? modalHeight : 370}
      onHardwareBackPress={() => {
        onClose?.();
        return true;
      }}
      rounded={rounded}
      style={bottomSheet ? {justifyContent: 'flex-end', margin: 0} : {}}
      modalAnimation={
        sheet
          ? new SlideAnimation({
              slideFrom: 'bottom',
            })
          : new ScaleAnimation({
              //@ts-ignore
              initialValue: 0, // optional
              useNativeDriver: true, // optional
            })
      }
      animationDuration={100}
      visible={visible}
      //@ts-ignore
      modalStyle={modalStyle ? modalStyle : {}}
      onTouchOutside={onClose}>
      <ModalContent>{children}</ModalContent>
    </Modal>
  );
};

export {ModalAnimated};
