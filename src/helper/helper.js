import React from 'react';

export const checkDesc = (name) => {
    if (name === "enbio-pro-5-3l-b-class-autoclave") {
        return (
            <div class="w-richtext"><p>Up to 4 times faster cycle time than the typical autoclave.</p><p>Enbio Pro - 18 minIn case of emergency, you can sterilize unwrapped instruments for immediate use in just 7 minutes.</p><p>Enbio sterilizers are up to 6 times smaller and 3 times lighter than a typical class-B / vacuum autoclave. But when it comes to work efficiency, they keep up the pace.</p></div>
        );
    }
    if (name === "runyes-18l-b-autoclave") {
        return (
            <div class="w-richtext">
                <p>Installation :<br />Easy to set up. Comes with detailed user and service manuals or you can contact our technical support team at anytime for additional support over the phone on 1300 144 975</p><p>Testing and Calibration :<br />Testing and Calibration can be carried out as required by one of our specialist field technicians or by a suitably qualified technician of your choice.</p><p>Ask us about our Australia wide testing and calibration services and benefit from our additional VIP Discounts and Promotions.</p></div>
        );
    }
    if (name == "runyes-x-rays-mobile-x-ray") {
        return (
            <div class="w-richtext"><p>The smallest focus (0.8mm) &nbsp;in the tube-head makes the images clearer and reduces the X-ray dose by 16-20 times compared with any other products in domestic market. The leaking radiation rate around 1m from focus is close to 0, and the head window is made of 1.5mm aluminum to filter X-ray. As a result, the health of patients and doctors can be protected better.</p></div>
        );
    }
    if (name == "mes-chair-compressor---three-chairs") {
        return (
            <div class="w-richtext"><p>One of our most popular models of the quiet dental compressor range, the AC300Q is designed to serve 3 to 4 chairs. Our Q series of compressors significantly reduces noise levels, making them an excellent option when equipment is close to the surgery.</p><p>• 7-year full parts and labour warranty<br />• Acoustic hood for significant sound reduction<br />• Certified food grade resin coated tank<br />• Added antimicrobial protection with Biocote®<br />silver-ion lining in tank<br />• Included installation kit to save installer time on site<br />• Unrivalled technical service back-up</p></div>
        );
    }
    else {
        return null;
    }
};

export const checkCategory = (name) => {
    if (name === "enbio-pro-5-3l-b-class-autoclave" || name === "runyes-18l-b-autoclave") {
        return (
            <span>Sterilization</span>
        );
    }
    if (name === "runyes-x-rays-mobile-x-ray") {
        return (<span>Dental Imagging</span>);

    }
    if (name == "mes-chair-compressor---three-chairs") {
        return (<span>Plant Room Equipment</span>);
    }
    else {
        return null;
    }
};

export const checkImage = (name) => {
    if (name === "enbio-pro-5-3l-b-class-autoclave") {
        return (
            <img loading="lazy" data-wf-sku-bindings="%5B%7B%22from%22%3A%22f_main_image_4dr%22%2C%22to%22%3A%22src%22%7D%5D" src="https://cdn.prod.website-files.com/66e3eea6994462754c30df44/66f06c6a7ee07fcce4fc4a7e_Enbio%20PRO.%20World%27s%20fastest%20class%20B%20autoclave.webp" alt="" sizes="(max-width: 479px) 92vw, (max-width: 767px) 93vw, 47vw" srcset="https://cdn.prod.website-files.com/66e3eea6994462754c30df44/66f06c6a7ee07fcce4fc4a7e_Enbio%20PRO.%20World%27s%20fastest%20class%20B%20autoclave-p-500.webp 500w, https://cdn.prod.website-files.com/66e3eea6994462754c30df44/66f06c6a7ee07fcce4fc4a7e_Enbio%20PRO.%20World%27s%20fastest%20class%20B%20autoclave.webp 600w" />
        );
    }
    if (name === "runyes-18l-b-autoclave") {
        return (
            <img loading="lazy" data-wf-sku-bindings="%5B%7B%22from%22%3A%22f_main_image_4dr%22%2C%22to%22%3A%22src%22%7D%5D" src="https://cdn.prod.website-files.com/66e3eea6994462754c30df44/66f0b8b0bb2895b5e1ae9e8f_runyes%2018L%20B%20autoclave.webp" alt="" sizes="(max-width: 479px) 92vw, (max-width: 767px) 93vw, 47vw" srcset="https://cdn.prod.website-files.com/66e3eea6994462754c30df44/66f0b8b0bb2895b5e1ae9e8f_runyes%2018L%20B%20autoclave-p-500.webp 500w, https://cdn.prod.website-files.com/66e3eea6994462754c30df44/66f0b8b0bb2895b5e1ae9e8f_runyes%2018L%20B%20autoclave-p-800.webp 800w, https://cdn.prod.website-files.com/66e3eea6994462754c30df44/66f0b8b0bb2895b5e1ae9e8f_runyes%2018L%20B%20autoclave.webp 1024w" />
        );
    }
    if (name === "runyes-x-rays-mobile-x-ray") {
        return (
            <img loading="lazy" data-wf-sku-bindings="%5B%7B%22from%22%3A%22f_main_image_4dr%22%2C%22to%22%3A%22src%22%7D%5D" src="https://cdn.prod.website-files.com/66e3eea6994462754c30df44/66f0b74ae5cecad0beb97ca5_rix70-dc-mobile-version-2-858x1030.jpg" alt="" sizes="(max-width: 479px) 92vw, (max-width: 767px) 93vw, 47vw" srcset="https://cdn.prod.website-files.com/66e3eea6994462754c30df44/66f0b74ae5cecad0beb97ca5_rix70-dc-mobile-version-2-858x1030-p-500.jpg 500w, https://cdn.prod.website-files.com/66e3eea6994462754c30df44/66f0b74ae5cecad0beb97ca5_rix70-dc-mobile-version-2-858x1030-p-800.jpg 800w, https://cdn.prod.website-files.com/66e3eea6994462754c30df44/66f0b74ae5cecad0beb97ca5_rix70-dc-mobile-version-2-858x1030.jpg 858w" />
        );

    }
    if (name == "mes-chair-compressor---three-chairs") {
        return (
            <img loading="lazy" data-wf-sku-bindings="%5B%7B%22from%22%3A%22f_main_image_4dr%22%2C%22to%22%3A%22src%22%7D%5D" src="https://cdn.prod.website-files.com/66e3eea6994462754c30df44/66f0b6bda11a1dc145d9f8c1_AC300Q_1024x1024.webp" alt="" />
        );
    }
    else {
        return null;
    }
};


