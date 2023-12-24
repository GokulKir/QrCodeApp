import Svg, { G, Path, Rect } from "react-native-svg";

const useIcon = () => {
  const ScannerIcon = () => {
    return (
      <Svg width={40} height={40} viewBox="0 0 14 14">
        <Path
          fill={"#fff"}
          fillRule="evenodd"
          d="M9.75.75A.75.75 0 0 1 10.5 0h1.75C13.216 0 14 .784 14 1.75V3.5a.75.75 0 0 1-1.5 0V1.75a.25.25 0 0 0-.25-.25H10.5a.75.75 0 0 1-.75-.75ZM0 7a.75.75 0 0 1 .75-.75h12.5a.75.75 0 0 1 0 1.5H.75A.75.75 0 0 1 0 7Zm1.5-5.25a.25.25 0 0 1 .25-.25H3.5a.75.75 0 0 0 0-1.5H1.75A1.75 1.75 0 0 0 0 1.75V3.5a.75.75 0 0 0 1.5 0V1.75Zm11.75 8a.75.75 0 0 1 .75.75v1.75A1.75 1.75 0 0 1 12.25 14H10.5a.75.75 0 0 1 0-1.5h1.75a.25.25 0 0 0 .25-.25V10.5a.75.75 0 0 1 .75-.75ZM1.5 10.5a.75.75 0 0 0-1.5 0v1.75C0 13.216.784 14 1.75 14H3.5a.75.75 0 0 0 0-1.5H1.75a.25.25 0 0 1-.25-.25V10.5Z"
          clipRule="evenodd"
        />
      </Svg>
    );
  };

  const UserIcon = () => {
    return (
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        viewBox="0 0 24 24"
      >
        <Path
          fill={"#0798e6"}
          d="M12 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4Z"
        />
      </Svg>
    );
  };

  const PasswordIcon = () => {
    return (
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        viewBox="0 0 24 24"
      >
        <Path
          fill={"#0798e6"}
          d="M16 11H8a1 1 0 0 1-1-1V7a5 5 0 0 1 10 0v3a1 1 0 0 1-1 1ZM9 9h6V7a3 3 0 0 0-6 0Z"
          opacity=".5"
        />
        <Rect width={16} height={13} x={4} y={9} fill={"#0798e6"} rx={3} />
      </Svg>
    );
  };

  const ArrowRightIcon = () => {
    return (
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        viewBox="0 0 24 24"
      >
        <G fill="none">
          <Path d="M24 0v24H0V0h24ZM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01l-.184-.092Z" />
          <Path
            fill={"#0798e6"}
            d="m15.06 5.283l5.657 5.657a1.5 1.5 0 0 1 0 2.12l-5.656 5.658a1.5 1.5 0 0 1-2.122-2.122l3.096-3.096H4.5a1.5 1.5 0 0 1 0-3h11.535L12.94 7.404a1.5 1.5 0 0 1 2.122-2.121Z"
          />
        </G>
      </Svg>
    );
  };

  const ConfirmCredentialIcon = () => {

    return (

    <Svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24">
      <Path fill={"#0798e6"} d="M11 17h2v-6h-2v6Zm1-8q.425 0 .713-.288T13 8q0-.425-.288-.712T12 7q-.425 0-.712.288T11 8q0 .425.288.713T12 9Zm0 13q-3.475-.875-5.738-3.988T4 11.1V5l8-3l8 3v6.1q0 3.8-2.262 6.913T12 22Zm0-2.1q2.6-.825 4.3-3.3t1.7-5.5V6.375l-6-2.25l-6 2.25V11.1q0 3.025 1.7 5.5t4.3 3.3Zm0-7.9Z" />
    </Svg>

    )

  };

  const InvalidQrIcon = () => {
    return (
      <Svg width="80" height="80" viewBox="0 0 24 24">
      <Path
        fill="none"
        stroke={'#FF0000'}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M15 12v3M12 3v3m6 6v3m-6 3h9m-3 3h3M6 12h3M6 6.011L6.01 6M12 12.011l.01-.011M3 12.011L3.01 12M12 9.011L12.01 9M12 15.011l.01-.011M15 21.011l.01-.011m-3.01.011l.01-.011M21 12.011l.01-.011M21 15.011l.01-.011M18 6.011L18.01 6M9 3.6v4.8a.6.6 0 0 1-.6.6H3.6a.6.6 0 0 1-.6-.6V3.6a.6.6 0 0 1 .6-.6h4.8a.6.6 0 0 1 .6.6Zm12 0v4.8a.6.6 0 0 1-.6.6h-4.8a.6.6 0 0 1-.6-.6V3.6a.6.6 0 0 1 .6-.6h4.8a.6.6 0 0 1 .6.6ZM6 18.011L6.01 18M9 15.6v4.8a.6.6 0 0 1-.6.6H3.6a.6.6 0 0 1-.6-.6v-4.8a.6.6 0 0 1 .6-.6h4.8a.6.6 0 0 1 .6.6Z"
      />
    </Svg>
    )
  }

  const DeveloperAlertIcon = () => {
    return (
      <Svg xmlns="http://www.w3.org/2000/svg" width={40} height={40} viewBox="0 0 24 24">
      <Path fill="#FF0000" d="M12 2L1 21h22M12 6l7.53 13H4.47M11 10v4h2v-4m-2 6v2h2v-2" />
    </Svg>
    )
  }

  return {
    ScannerIcon,
    UserIcon,
    PasswordIcon,
    ArrowRightIcon,
    ConfirmCredentialIcon,
    InvalidQrIcon ,
    DeveloperAlertIcon
  };
};

export default useIcon;
