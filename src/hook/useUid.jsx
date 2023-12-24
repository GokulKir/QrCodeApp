import uuid from "react-native-uuid";

const useUid = () => {
  const USER_UUID = uuid.v4();

  return {
    USER_UUID,
  };
};

export default useUid
