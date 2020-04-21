import React from 'react'
import Image from './footerImg.png'
import './Footer.css'
import { Header } from '../Header/Header.jsx'
import { Layout, Breadcrumb } from 'antd';


function Footer (props) {
  return (
    <React.Fragment>
            <div className={'footer'}>
                <div className={'main-text'}>
                    <svg width="600" height="36" viewBox="0 0 904 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M29.4826 44.3216H20.6023V63.1876H0V18.0536H20.6023V35.1142H29.4826L50.7953 18.0536H74.5945L46.5327 39.3568L78.1466 63.1876H53.2818L29.4826 44.3216Z" fill="#fafafa"/>
                        <path d="M90.5374 18.0536H125.171C131.801 18.0536 137.425 18.3545 142.043 18.9563C146.661 19.5581 150.391 20.4307 153.232 21.574C156.192 22.6573 158.324 23.9812 159.626 25.5458C160.928 27.1105 161.58 28.8557 161.58 30.7814C161.58 32.5867 160.692 34.2717 158.916 35.8364C157.14 37.401 154.357 38.725 150.568 39.8082C155.66 40.8312 159.33 42.2454 161.58 44.0508C163.948 45.8561 165.132 47.842 165.132 50.0085C165.132 52.0545 164.481 53.89 163.178 55.5148C161.876 57.1396 159.744 58.5237 156.784 59.6671C153.943 60.8105 150.213 61.6831 145.595 62.2849C140.977 62.8867 135.353 63.1876 128.723 63.1876H90.5374V18.0536ZM110.429 44.2313V54.8829H128.723C134.169 54.8829 137.958 54.4316 140.089 53.5289C142.339 52.5661 143.464 51.2421 143.464 49.5571C143.464 47.8721 142.339 46.5783 140.089 45.6756C137.958 44.7127 134.169 44.2313 128.723 44.2313H110.429ZM110.429 26.3583V36.1072H125.171C130.854 36.1072 134.702 35.6859 136.715 34.8434C138.846 34.0009 139.912 32.7974 139.912 31.2327C139.912 29.6681 138.846 28.4645 136.715 27.622C134.702 26.7795 130.854 26.3583 125.171 26.3583H110.429Z" fill="#fafafa"/>
                        <path d="M219.218 64C212.825 64 207.082 63.5186 201.991 62.5557C196.899 61.5327 192.518 60.0884 188.848 58.2229C185.177 56.2971 182.336 53.9803 180.323 51.2722C178.428 48.5642 177.481 45.4951 177.481 42.0649V39.1763C177.481 35.7461 178.428 32.677 180.323 29.969C182.336 27.2609 185.177 24.9741 188.848 23.1086C192.518 21.1829 196.899 19.7386 201.991 18.7757C207.082 17.7527 212.825 17.2412 219.218 17.2412C232.124 17.2412 242.307 19.2572 249.767 23.2891C257.226 27.3211 260.956 33.0983 260.956 40.6206V44.141H198.083C198.675 47.9323 200.747 50.6704 204.299 52.3554C207.852 53.9803 212.825 54.7927 219.218 54.7927C225.494 54.7927 230.052 54.2511 232.894 53.1678C235.854 52.0244 237.808 50.7005 238.755 49.196H260.068C259.12 51.3023 257.64 53.2581 255.628 55.0635C253.615 56.8688 250.951 58.4335 247.635 59.7574C244.32 61.0813 240.294 62.1345 235.558 62.9168C230.822 63.6389 225.375 64 219.218 64ZM219.218 26.4485C213.18 26.4485 208.444 27.2008 205.01 28.7052C201.576 30.2097 199.386 32.5867 198.438 35.8364H239.998C239.169 32.4664 236.979 30.0592 233.427 28.615C229.993 27.1707 225.257 26.4485 219.218 26.4485Z" fill="#fafafa"/>
                        <path d="M315.132 64C308.739 64 302.937 63.5186 297.727 62.5557C292.636 61.5327 288.255 60.0884 284.584 58.2229C281.032 56.2971 278.25 53.9803 276.237 51.2722C274.342 48.5642 273.395 45.4951 273.395 42.0649V39.1763C273.395 35.8063 274.342 32.7673 276.237 30.0592C278.25 27.3512 281.091 25.0644 284.762 23.1989C288.432 21.2732 292.813 19.7988 297.905 18.7757C303.114 17.7527 308.857 17.2412 315.132 17.2412C326.381 17.2412 335.084 18.6554 341.241 21.4838C347.516 24.3122 351.542 27.9831 353.318 32.4965H331.295C330.347 30.8717 328.394 29.5477 325.434 28.5247C322.474 27.5016 318.744 26.9901 314.244 26.9901C311.64 26.9901 309.153 27.2308 306.785 27.7123C304.535 28.1335 302.522 28.8557 300.746 29.8787C298.97 30.8416 297.549 32.1053 296.484 33.67C295.537 35.1744 295.063 37.0099 295.063 39.1763V42.0649C295.063 44.1711 295.596 46.0066 296.661 47.5712C297.727 49.0757 299.148 50.3394 300.924 51.3625C302.7 52.3253 304.713 53.0475 306.963 53.5289C309.331 54.0103 311.758 54.2511 314.244 54.2511C319.336 54.2511 323.184 53.6794 325.789 52.536C328.512 51.3926 330.347 49.9784 331.295 48.2934H353.318C351.542 53.0475 347.516 56.8688 341.241 59.7574C335.084 62.5858 326.381 64 315.132 64Z" fill="#fafafa"/>
                        <path d="M356.044 18.0536H430.639V27.2609H403.643V63.1876H383.04V27.2609H356.044V18.0536Z" fill="#fafafa"/>
                        <path d="M477.822 64C471.428 64 465.627 63.5186 460.417 62.5557C455.325 61.5327 450.944 60.0884 447.274 58.2229C443.722 56.2971 440.939 53.9803 438.927 51.2722C437.032 48.5642 436.085 45.4951 436.085 42.0649V39.1763C436.085 35.8063 437.032 32.7673 438.927 30.0592C440.939 27.3512 443.781 25.0644 447.452 23.1989C451.122 21.2732 455.503 19.7988 460.594 18.7757C465.804 17.7527 471.547 17.2412 477.822 17.2412C489.071 17.2412 497.773 18.6554 503.93 21.4838C510.206 24.3122 514.231 27.9831 516.008 32.4965H493.984C493.037 30.8717 491.083 29.5477 488.123 28.5247C485.163 27.5016 481.434 26.9901 476.934 26.9901C474.329 26.9901 471.843 27.2308 469.475 27.7123C467.225 28.1335 465.212 28.8557 463.436 29.8787C461.66 30.8416 460.239 32.1053 459.174 33.67C458.226 35.1744 457.753 37.0099 457.753 39.1763V42.0649C457.753 44.1711 458.286 46.0066 459.351 47.5712C460.417 49.0757 461.838 50.3394 463.614 51.3625C465.39 52.3253 467.403 53.0475 469.652 53.5289C472.02 54.0103 474.448 54.2511 476.934 54.2511C482.026 54.2511 485.874 53.6794 488.479 52.536C491.202 51.3926 493.037 49.9784 493.984 48.2934H516.008C514.231 53.0475 510.206 56.8688 503.93 59.7574C497.773 62.5858 489.071 64 477.822 64Z" fill="#fafafa"/>
                        <path d="M586.851 27.2609H551.685V63.1876H531.083V18.0536H607.454V63.1876H586.851V27.2609Z" fill="#fafafa"/>
                        <path d="M666.875 64C660.481 64 654.739 63.5186 649.648 62.5557C644.556 61.5327 640.175 60.0884 636.505 58.2229C632.834 56.2971 629.992 53.9803 627.98 51.2722C626.085 48.5642 625.138 45.4951 625.138 42.0649V39.1763C625.138 35.7461 626.085 32.677 627.98 29.969C629.992 27.2609 632.834 24.9741 636.505 23.1086C640.175 21.1829 644.556 19.7386 649.648 18.7757C654.739 17.7527 660.481 17.2412 666.875 17.2412C679.781 17.2412 689.964 19.2572 697.424 23.2891C704.883 27.3211 708.613 33.0983 708.613 40.6206V44.141H645.74C646.332 47.9323 648.404 50.6704 651.956 52.3554C655.508 53.9803 660.481 54.7927 666.875 54.7927C673.151 54.7927 677.709 54.2511 680.551 53.1678C683.511 52.0244 685.465 50.7005 686.412 49.196H707.725C706.777 51.3023 705.297 53.2581 703.284 55.0635C701.272 56.8688 698.608 58.4335 695.292 59.7574C691.977 61.0813 687.951 62.1345 683.215 62.9168C678.479 63.6389 673.032 64 666.875 64ZM666.875 26.4485C660.837 26.4485 656.101 27.2008 652.667 28.7052C649.233 30.2097 647.043 32.5867 646.095 35.8364H687.655C686.826 32.4664 684.636 30.0592 681.084 28.615C677.65 27.1707 672.914 26.4485 666.875 26.4485Z" fill="#fafafa"/>
                        <path d="M785.701 31.323L777.708 39.7179L752.311 63.1876H726.38V18.0536H746.982V49.9182L754.975 41.5233L780.372 18.0536H806.303V63.1876H785.701V31.323ZM766.342 12.5472C758.172 12.5472 751.837 11.4339 747.338 9.20733C742.838 6.98072 740.589 3.91161 740.589 0H756.573C756.573 2.16643 757.461 3.79126 759.237 4.87447C761.132 5.89751 763.5 6.40903 766.342 6.40903C769.065 6.40903 771.433 5.89751 773.446 4.87447C775.459 3.79126 776.465 2.16643 776.465 0H792.094C792.094 3.91161 789.845 6.98072 785.345 9.20733C780.846 11.4339 774.511 12.5472 766.342 12.5472Z" fill="#fafafa"/>
                        <path d="M865.815 64C859.421 64 853.619 63.5186 848.409 62.5557C843.318 61.5327 838.937 60.0884 835.266 58.2229C831.714 56.2971 828.932 53.9803 826.919 51.2722C825.025 48.5642 824.077 45.4951 824.077 42.0649V39.1763C824.077 35.8063 825.025 32.7673 826.919 30.0592C828.932 27.3512 831.774 25.0644 835.444 23.1989C839.115 21.2732 843.496 19.7988 848.587 18.7757C853.797 17.7527 859.539 17.2412 865.815 17.2412C877.063 17.2412 885.766 18.6554 891.923 21.4838C898.198 24.3122 902.224 27.9831 904 32.4965H881.977C881.03 30.8717 879.076 29.5477 876.116 28.5247C873.156 27.5016 869.426 26.9901 864.927 26.9901C862.322 26.9901 859.835 27.2308 857.467 27.7123C855.218 28.1335 853.205 28.8557 851.429 29.8787C849.653 30.8416 848.232 32.1053 847.166 33.67C846.219 35.1744 845.745 37.0099 845.745 39.1763V42.0649C845.745 44.1711 846.278 46.0066 847.344 47.5712C848.409 49.0757 849.83 50.3394 851.606 51.3625C853.382 52.3253 855.395 53.0475 857.645 53.5289C860.013 54.0103 862.44 54.2511 864.927 54.2511C870.018 54.2511 873.866 53.6794 876.471 52.536C879.194 51.3926 881.03 49.9784 881.977 48.2934H904C902.224 53.0475 898.198 56.8688 891.923 59.7574C885.766 62.5858 877.063 64 865.815 64Z" fill="#fafafa"/>
                    </svg>
                </div>
                <div className={'mini-text'}>
                    сделано с любовью в 2020 году ребятами с матмеха урфу
                </div>
                <div className={'link1'}><a href="https://github.com/lalka-anka"> Аня </a> </div>
                <div className={'link2'}><a href="https://github.com/tramakarov"> Егор </a> </div>
                <div className={'link3'}><a href="https://github.com/usernamedt"> Данил </a> </div>
                <div className={'link4'}><a href="https://github.com/toplenboren"> Миша </a> </div>
                    <img src={Image} width={'100%'} height="160" alt="Responsive image"/>

        </div>

    </React.Fragment>
  )
}
export default Footer
