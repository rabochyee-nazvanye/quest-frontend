import React from 'react'
import { Link } from 'react-router-dom'
import './QuestspaceIcon.css'

export default function QuestspaceIcon (props) {
    return (
        <Link to='/'>
            <div className={'icon'}>
                <svg width={props.width} height={props.height} viewBox="0 0 416 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M33.6011 32.9996C30.5411 33.0176 27.7901 32.1466 25.5071 30.1736C22.9751 27.9856 21.9751 25.1376 22.0001 21.9096C22.0221 19.2316 22.7581 16.7956 24.6031 14.7376C26.2581 12.8926 28.3641 11.7946 30.8221 11.2956C33.9091 10.6686 36.8801 11.0206 39.6141 12.5286C43.0621 14.4316 44.7651 17.4126 44.9751 21.2076C45.1601 24.5456 44.3341 27.5526 41.7751 29.9516C39.5041 32.0806 36.7191 32.9676 33.6011 32.9996ZM33.6751 16.3966C31.0831 16.4586 29.2641 17.8056 28.5691 20.0236C28.1421 21.3906 28.1691 22.7466 28.5951 24.1136C29.2141 26.0986 30.5851 27.3176 32.6731 27.6356C34.7881 27.9566 36.6051 27.2776 37.7611 25.4836C39.0761 23.4406 39.1011 21.2586 38.0521 19.0976C37.1541 17.2466 35.5541 16.4186 33.6751 16.3966Z" fill={props.color}/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M107.976 18.1886C107.814 17.1556 107.068 16.5756 106.115 16.2336C104.479 15.6456 102.786 15.6136 101.075 15.7526C99.4942 15.8806 97.9652 16.1946 96.4912 16.9546C96.2182 15.4726 95.9552 14.0516 95.6892 12.6146C96.9862 11.9826 98.2882 11.6306 99.6262 11.3936C102.488 10.8886 105.356 10.8096 108.192 11.5126C111.183 12.2546 113.283 13.9486 113.863 17.0646C114.006 17.8346 114 18.9996 114 18.9996V25.9996C114 26.3036 114.038 26.9536 114.057 27.2566C114.163 28.8746 114.311 29.0326 116 29.2776V32.6086C114.333 33.0206 112.621 33.2376 110.926 32.4556C109.973 32.0166 109.534 31.2036 109.325 30.2436C109.283 30.0516 109.275 29.8526 109.24 29.5656C107.194 32.4446 104.266 33.1516 101.048 32.9746C97.4422 32.7766 94.6742 30.4066 94.1642 27.6106C93.3352 23.0606 95.6802 19.6616 100.36 18.9756C103.319 18.5416 104.167 18.7256 107.992 19.9996C107.992 19.3846 108.068 18.7746 107.976 18.1886ZM107.875 23.9746C106.893 23.3136 105.777 22.9666 104.61 22.8216C103.397 22.6706 102.2 22.7496 101.171 23.5276C100.227 24.2416 99.8702 25.3756 100.216 26.5446C100.481 27.4436 101.417 28.1476 102.52 28.2496C103.583 28.3496 104.614 28.1916 105.596 27.7826C107.358 27.0476 108.048 25.8876 107.875 23.9746Z" fill={props.color}/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M80 24.0001H77V33.0001L71 32.9811V11.0001H77V19.0001C78.399 18.9941 79.782 19.2871 81.042 18.8481C82.651 18.2871 83.777 17.1801 84.23 15.5231C84.628 14.0711 85 13.0001 85 11.0001H90.796C90.918 15.5201 90.04 19.5011 85.815 21.9821C85.981 22.2981 86.113 22.5751 86.268 22.8371C88.002 25.8011 89.746 28.7581 91.472 31.7281C91.68 32.0861 91.796 32.5011 92 33.0001H85.493C83.846 30.0731 82.166 27.0881 80.49 24.1101L80 24.0001Z" fill={props.color}/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M61.0645 11.0001H67.0005V33.0001H61.0065V25.9451C59.9035 26.2001 58.8935 26.5181 57.8605 26.6581C55.1395 27.0261 52.5485 26.6911 50.3295 24.8141C48.6135 23.3621 47.6085 21.4151 47.3045 19.2061C47.0005 17.0001 47 14 47 11.0001H53.0005V12.0001V17.0001C53.0005 19.3551 55.0755 21.2131 57.3345 21.2461C58.7295 21.2661 59.5435 20.9261 60.9935 20.0061L61.0645 11.0001Z" fill={props.color}/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M13 33.0001H7V17.0001H0V11.0001H20V17.0001H13V33.0001Z" fill={props.color}/>
                    <path d="M182.097 32.4487L177.687 23.7551H172.937V32.4487H167V10.6512H172.937V18.7934H177.772L181.927 10.6512H187.992L182.648 21.1683L188.331 32.4487H182.097Z" fill={props.color}/>
                    <path d="M209.761 20.3625V21.4651C210.863 21.7478 211.754 22.3133 212.433 23.1614C213.111 24.0096 213.45 25.098 213.45 26.4268C213.45 30.4414 210.878 32.4487 205.732 32.4487H192.925V10.6512H205.393C207.57 10.6512 209.252 11.1459 210.439 12.1354C211.655 13.0967 212.263 14.4396 212.263 16.1642C212.263 18.1432 211.429 19.5426 209.761 20.3625ZM198.735 28.1655H204.375C206.439 28.1655 207.471 27.3598 207.471 25.7483C207.471 24.1085 206.439 23.2886 204.375 23.2886H198.735V28.1655ZM198.735 14.9343V19.1327H203.781C205.478 19.1327 206.326 18.44 206.326 17.0547C206.326 15.6411 205.478 14.9343 203.781 14.9343H198.735Z" fill={props.color}/>
                    <path d="M238.872 20.4473V22.2285H223.266C223.436 26.13 225.203 28.0807 228.567 28.0807C230.716 28.0807 232.073 27.3174 232.638 25.7907H238.66C238.208 28.0524 237.12 29.8194 235.395 31.0917C233.67 32.3639 231.366 33 228.482 33C225.062 33 222.348 31.9539 220.34 29.8618C218.361 27.7697 217.372 24.9708 217.372 21.4651C217.372 17.9877 218.361 15.2312 220.34 13.1956C222.319 11.1318 224.991 10.0999 228.355 10.0999C231.578 10.0999 234.123 11.0611 235.989 12.9836C237.855 14.9061 238.816 17.394 238.872 20.4473ZM232.808 18.2845C232.412 15.7966 230.914 14.5527 228.313 14.5527C225.712 14.5527 224.1 15.7966 223.478 18.2845H232.808Z" fill={props.color}/>
                    <path d="M257.773 25.1122H263.625C263.342 27.487 262.282 29.3953 260.444 30.8372C258.635 32.2791 256.373 33 253.659 33C250.295 33 247.623 31.9681 245.644 29.9042C243.665 27.8121 242.675 25.0274 242.675 21.5499C242.675 18.1008 243.665 15.3301 245.644 13.238C247.623 11.1459 250.295 10.0999 253.659 10.0999C256.373 10.0999 258.607 10.7925 260.359 12.1778C262.141 13.5349 263.173 15.3443 263.455 17.606H257.561C257.08 15.9097 255.794 15.0616 253.701 15.0616C251.949 15.0616 250.662 15.6553 249.842 16.8427C249.022 18.0301 248.613 19.585 248.613 21.5075C248.613 23.43 249.022 25.0132 249.842 26.2572C250.691 27.4729 251.977 28.0807 253.701 28.0807C256.048 28.0807 257.405 27.0912 257.773 25.1122Z" fill={props.color}/>
                    <path d="M266.763 15.6129V10.6512H286.992V15.6129H279.867V32.4487H273.93V15.6129H266.763Z" fill={props.color}/>
                    <path d="M305.274 25.1122H311.126C310.844 27.487 309.783 29.3953 307.946 30.8372C306.136 32.2791 303.875 33 301.161 33C297.796 33 295.125 31.9681 293.146 29.9042C291.167 27.8121 290.177 25.0274 290.177 21.5499C290.177 18.1008 291.167 15.3301 293.146 13.238C295.125 11.1459 297.796 10.0999 301.161 10.0999C303.875 10.0999 306.108 10.7925 307.861 12.1778C309.642 13.5349 310.674 15.3443 310.957 17.606H305.062C304.581 15.9097 303.295 15.0616 301.203 15.0616C299.45 15.0616 298.164 15.6553 297.344 16.8427C296.524 18.0301 296.114 19.585 296.114 21.5075C296.114 23.43 296.524 25.0132 297.344 26.2572C298.192 27.4729 299.478 28.0807 301.203 28.0807C303.55 28.0807 304.907 27.0912 305.274 25.1122Z" fill={props.color}/>
                    <path d="M336.911 32.4487H330.974V15.6129H322.068V32.4487H316.131V10.6512H336.911V32.4487Z" fill={props.color}/>
                    <path d="M363.445 20.4473V22.2285H347.839C348.008 26.13 349.775 28.0807 353.14 28.0807C355.288 28.0807 356.646 27.3174 357.211 25.7907H363.233C362.78 28.0524 361.692 29.8194 359.967 31.0917C358.243 32.3639 355.939 33 353.055 33C349.634 33 346.92 31.9539 344.913 29.8618C342.934 27.7697 341.944 24.9708 341.944 21.4651C341.944 17.9877 342.934 15.2312 344.913 13.1956C346.892 11.1318 349.563 10.0999 352.928 10.0999C356.151 10.0999 358.695 11.0611 360.561 12.9836C362.427 14.9061 363.388 17.394 363.445 20.4473ZM357.381 18.2845C356.985 15.7966 355.486 14.5527 352.885 14.5527C350.284 14.5527 348.673 15.7966 348.051 18.2845H357.381Z" fill={props.color}/>
                    <path d="M374.245 32.4487H368.478V10.6512H374.245V22.9494H375.263L383.702 10.6512H389.554V32.4487H383.787V20.1929H382.769L374.245 32.4487ZM382.133 2H386.713C386.543 4.0073 385.794 5.57638 384.465 6.70725C383.165 7.80985 381.341 8.36115 378.995 8.36115C376.648 8.36115 374.825 7.80985 373.524 6.70725C372.224 5.57638 371.489 4.0073 371.319 2H375.899C375.984 2.76334 376.281 3.38532 376.79 3.86594C377.299 4.34656 378.034 4.58687 378.995 4.58687C380.889 4.58687 381.935 3.72458 382.133 2Z" fill={props.color}/>
                    <path d="M409.678 25.1122H415.53C415.248 27.487 414.188 29.3953 412.35 30.8372C410.54 32.2791 408.279 33 405.565 33C402.2 33 399.529 31.9681 397.55 29.9042C395.571 27.8121 394.581 25.0274 394.581 21.5499C394.581 18.1008 395.571 15.3301 397.55 13.238C399.529 11.1459 402.2 10.0999 405.565 10.0999C408.279 10.0999 410.512 10.7925 412.265 12.1778C414.046 13.5349 415.078 15.3443 415.361 17.606H409.466C408.985 15.9097 407.699 15.0616 405.607 15.0616C403.854 15.0616 402.568 15.6553 401.748 16.8427C400.928 18.0301 400.518 19.585 400.518 21.5075C400.518 23.43 400.928 25.0132 401.748 26.2572C402.596 27.4729 403.882 28.0807 405.607 28.0807C407.954 28.0807 409.311 27.0912 409.678 25.1122Z" fill={props.color}/>
                    <path d="M139.49 21.48L134.03 15.99L135.53 14.49L141.02 19.98L146.48 14.49L147.98 15.99L142.52 21.48L147.98 26.97L146.48 28.47L141.02 23.01L135.53 28.47L134.03 26.97L139.49 21.48Z" fill={props.color}/>
                </svg>

            </div>
        </Link>
    )
}
