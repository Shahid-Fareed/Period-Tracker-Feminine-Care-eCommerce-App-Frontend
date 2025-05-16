import { View, Text, SafeAreaView, ScrollView, StyleSheet } from "react-native";
import React from "react";
import Colors from "../../Contants/Colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { LinearGradient } from "expo-linear-gradient";

const TermAndContditions = () => {
  return (
    <LinearGradient
      colors={["#f6dfab", "#f9d8b7", "#facdc8"]}
      start={{ x: 0, y: 0.3 }}
      end={{ x: 0.6, y: 0.6 }}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={{ flex: 1, backgroundColor: "transparent" }}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            padding: 20,
            backgroundColor: "transparent",
          }}
        >
          <Text allowFontScaling={false}  style={styles.text}>
            These Terms of Use (this “Agreement”) are a legal agreement between
            you (“you”) and Packages Limited, a company incorporated in Pakistan
            (“Company,” “we” or “us”) for use of the mobile application,
            the website (), and all related services, features
            and content offered by the Company. This Agreement is not concluded
            with Apple, Inc., any of its subsidiaries, Google, Inc., any of its
            subsidiaries, or any other entity as may apply.
          </Text>
          <Text allowFontScaling={false}  style={{ ...styles.textBold, marginTop: 10 }}>
            1. Acceptance of terms
          </Text>
          <Text allowFontScaling={false}  style={{ ...styles.text, marginTop: 10 }}>
            Please read this Agreement carefully. By creating an account or
            accessing or using the App, you acknowledge that you accept and
            agree to be bound by the terms of this Agreement.{" "}
            <Text allowFontScaling={false}  style={styles.textBold}>
              If you do not agree to these Terms, you may not access or use the
              app.
            </Text>
          </Text>
          <View style={{ marginTop: 10 }} />
          <Text allowFontScaling={false}  style={styles.text}>
            We may modify this Agreement from time to time. We will notify you
            by email, through the App, or by presenting you with a new version
            of the Agreement for you to accept if we make modifications that
            materially change your rights. Your continued use of the App after
            the effective date of an updated version of the Agreement will
            indicate your acceptance of the Agreement as modified.
          </Text>
          <Text allowFontScaling={false}  style={{ ...styles.textBold, marginTop: 10 }}>
            2. Medical services disclaimer
          </Text>
          <Text allowFontScaling={false}  style={{ ...styles.text, marginTop: 10 }}>
            The company is not a licensed medical care provider and the app is
            not Intended to replace professional medical advice or diagnose,
            treat or Manage any illness or medical condition, or serve as a
            birth control Method or ​contraception. Please consult with a
            licensed physician or Other qualified healthcare provider before
            making any decisions or Taking any actions that may affect your
            health and safety or that of Your family or foetus. Never disregard
            professional medical advice or Delay in seeking it because of
            something you have read in connection With the app. Always consult
            with your healthcare professional if you Have any questions or
            concerns about your health or condition or Experience any changes in
            your condition or health status. If you Think you have a medical
            emergency, call emergency services or go to The nearest open
            emergency room immediately.
          </Text>
          <Text allowFontScaling={false}  style={{ ...styles.text, marginTop: 10 }}>
            We disclaim liability for any errors or omissions, or for unintended
            Technical inaccuracies, or typographical errors in the provided
            Materials, as well as any violation of any ethical or moral
            standards Applicable in your community to sexual education and
            related Materials. ​ nothing in this agreement excludes or limits in
            any way Our liability to you where it would be unlawful to do so.
          </Text>
          <Text allowFontScaling={false}  style={{ ...styles.textBold, marginTop: 10 }}>
            3. Registration and Eligibility
          </Text>
          <Text allowFontScaling={false}  style={{ ...styles.text, marginTop: 10 }}>
            To use the App, you may be required to create or update an account
            (“Account”) and will be asked to provide certain personal
            information, which may include your name, birth date, and e-mail
            address. You agree that you will supply accurate and complete
            information to the Company, and that you will update that
            information promptly after it changes.
          </Text>
          <Text allowFontScaling={false}  style={{ ...styles.text, marginTop: 10 }}>
            To create an Account and access the App, you must be at least 13
            years old and not barred from using the App under applicable law.
          </Text>
          <Text allowFontScaling={false}  style={{ ...styles.text, marginTop: 10 }}>
            If you are under 18, your parent or guardian must review and accept
            the terms of this Agreement, and by using the App, you confirm that
            your parent or guardian has so reviewed and accepted this Agreement.
            We reserve the right to limit the availability to users under the
            age of 18 of certain content in the App, in our sole discretion.
          </Text>
          <Text allowFontScaling={false}  style={{ ...styles.textBold, marginTop: 10 }}>
            4. Use at your own risk
          </Text>
          <Text allowFontScaling={false}  style={{ ...styles.text, marginTop: 10 }}>
            Our goal is to help make certain health-related information more
            readily available and useful to you. However, the App cannot and
            does not guarantee health-related improvements or outcomes. Your use
            of the App and any information, predictions, or suggestions provided
            in the App are at your sole risk. We make no representation or
            warranty of any kind as to the accuracy of data, information,
            estimates, and predictions that we may provide to you through the
            App and you agree and understand that the App is not intended to
            match or serve the same purpose as a medical or scientific device or
            healthcare provider.
          </Text>
          <Text allowFontScaling={false}  style={{ ...styles.textBold, marginTop: 10 }}>
            5. Use by minors disclaimer
          </Text>
          <Text allowFontScaling={false}  style={{ ...styles.text, marginTop: 10 }}>
            The information within the app does not incite, induce or otherwise
            Promote any sexual behavior or activity among minors and does not
            Direct the content of communication to any particular person. All
            Information provided within the app is for general educational
            Purposes only.
          </Text>
          <Text allowFontScaling={false}  style={{ ...styles.text, marginTop: 10 }}>
            We carefully examine the materials that we make available via the
            App to people between 13 and 17 in order to avoid any inappropriate
            or harmful content. We fully understand that moral and ethical rules
            might differ from country to country in defining what information
            related to sexuality is accessible to minors.
          </Text>
          <Text allowFontScaling={false}  style={{ ...styles.text, marginTop: 10 }}>
            We neither intend nor publish sexually explicit content, or content
            that otherwise might qualify as harmful to minors or juveniles under
            applicable law. We make reasonable efforts to ensure that all
            materials provided by us on the App are based on facts only and are
            scientifically accurate.
          </Text>
          <Text allowFontScaling={false}  style={{ ...styles.text, marginTop: 10 }}>
            Please be aware that individual ethical views on what is offensive
            or harmful to minors may vary from the requirements set for content
            that may be made available to minors under applicable law.
          </Text>
          <Text allowFontScaling={false}  style={{ ...styles.textBold, marginTop: 10 }}>
            6. Passwords
          </Text>
          <Text allowFontScaling={false}  style={{ ...styles.text, marginTop: 10 }}>
            You grant the company and all other persons or entities involved in
            The operation of the app the right to transmit, monitor, retrieve,
            Store, and use your information in connection with the operation of
            The app. You further acknowledge and agree that the app and account
            Are designed and intended for personal use on an individual basis
            and You should not share your account and/or password details with
            another Individual. The company cannot and does not assume any
            responsibility Or liability for any information you submit, or your
            or third parties’ Use or misuse of information transmitted or
            received arising from the Using the app, and shall not be
            responsible for any losses arising out Of the unauthorized use of
            your account or information resulting from You not following these
            rules.
          </Text>
          <Text allowFontScaling={false}  style={{ ...styles.textBold, marginTop: 10 }}>
            7. Warranty disclaimer
          </Text>
          <Text allowFontScaling={false}  style={{ ...styles.text, marginTop: 10 }}>
            The company controls and operates the app from various locations and
            Makes no representation that the app is appropriate or available for
            Use in all locations. The app or certain features of it may not be
            Available in your location or may vary across locations.
          </Text>
          <Text allowFontScaling={false}  style={{ ...styles.text, marginTop: 10 }}>
            The app is provided “as is”, “as available” and is provided without
            Any representations or warranties of any kind, express or implied,
            Including, but not limited to, the implied warranties of title,
            Non-infringement, merchantability, and fitness for a particular
            Purpose, and any warranties implied by any course of performance or
            Usage of trade, all of which are expressly disclaimed, save to the
            Extent required by law. Neither the company, nor any of its
            officers, Directors, employees, agents, affiliates, representatives,
            suppliers, Partners, advertisers or content providers warrants, and
            each of them Hereby expressly disclaims, that: (a) the app will be
            secure or Available at any particular time or location; (b) any
            defects or Errors will be corrected; (c) any content or software
            available at or Through the app is free of viruses or other harmful
            components; (d) The results of using the app will meet your
            requirements. Or (e) the Accuracy, reliability, or completeness of
            the content, text, images, Software, graphics, or communications
            provided by third parties on or Through the app. Your use of the app
            is solely at your own risk. Some States / countries do not allow
            limitations on implied warranties, so Some or all of the above
            limitations may not apply to you.
          </Text>
          <Text allowFontScaling={false}  style={{ ...styles.textBold, marginTop: 10 }}>
            8. Limitation of liability
          </Text>
          <Text allowFontScaling={false}  style={{ ...styles.text, marginTop: 10 }}>
            In no event shall the company or any of its officers, directors,
            Agents, affiliates, employees, representatives, suppliers, partners,
            Advertisers, or data providers be liable for any indirect, special,
            Incidental, consequential, exemplary or punitive damages (including
            But not limited to loss of use, loss of profits, or loss of data)
            Whether in an action in contract, tort (including but not limited to
            Negligence), equity or otherwise, arising out of or in any way
            Connected with the use or misuse of this app. None of the company or
            Any of its officers, directors, agents, affiliates, employees,
            Representatives, suppliers, partners, advertisers, or content
            Providers, or any third parties mentioned on the app shall be liable
            For any personal injury, including death, caused by your use or
            misuse Of the app.  The laws of some states / countries impose
            restrictions On limiting liability. Nothing in this agreement
            excludes or limits Our liability to you where it would be unlawful
            to do so. Where any Provision is expressed to exclude or limit
            liability to a greater Extent than permitted by applicable law, that
            provision shall be Deemed to only exclude or limit our liability to
            the maximum extent Permitted by applicable law.
          </Text>
          <Text allowFontScaling={false}  style={{ ...styles.textBold, marginTop: 10 }}>
            9. Use of mobile devices
          </Text>
          <Text allowFontScaling={false}  style={{ ...styles.text, marginTop: 10 }}>
            Please note that your carrier’s normal rates and fees, such as text
            messaging and data charges, will still apply if you are using the
            App on a mobile device.
          </Text>
          <Text allowFontScaling={false}  style={{ ...styles.textBold, marginTop: 10 }}>
            10. Third-Party Services and links
          </Text>
          <Text allowFontScaling={false}  style={{ ...styles.text, marginTop: 10 }}>
            The App may give you access to links to third-party websites, apps,
            or other products or services (“Third Party Services”). The Company
            does not control Third Party Services in any manner and,
            accordingly, the Company is not responsible for the privacy
            practices of such Third-Party Services and does not assume any
            liability associated with such Third-Party Services. Your linking to
            or use of any Third-Party Services other than the App is at your own
            risk. The Company's inclusion of links to Third Party Services does
            not imply any endorsement of any kind by the Company of the material
            located on or linked to by such Third-Party Services and should not
            be deemed as such by any user of the App. The Company disclaims any
            responsibility for the products or services offered or the
            information contained on any Third-Party Services. You need to take
            appropriate steps to determine whether accessing a Third-Party
            Service is appropriate, including protecting your personal
            information and privacy in using any such Third-Party Services and
            complying with relevant agreements.
          </Text>
          <Text allowFontScaling={false}  style={{ ...styles.text, marginTop: 10 }}>
            You shall not link to our websites, app, content or services in a
            way that is: (i) illegal, (ii) suggests any form of association,
            approval or endorsement with or by us where none exists, (iii)
            damages our reputation or takes advantage of it, or (iv) is unfair. 
          </Text>
          <Text allowFontScaling={false}  style={{ ...styles.textBold, marginTop: 10 }}>
            11. Your feedback
          </Text>
          <Text allowFontScaling={false}  style={{ ...styles.text, marginTop: 10 }}>
            We welcome your feedback about the App. Unless otherwise expressly
            declared, any communications you send to us or publish in app stores
            are deemed to be submitted on a non-confidential basis. You agree
            that we may decide to publicize such contents at our own discretion.
            You agree to authorize us to make use of such contents for free, and
            revise, modify, adjust and change it contextually, or make any other
            changes, in each case as we deem appropriate.
          </Text>
          <Text allowFontScaling={false}  style={{ ...styles.textBold, marginTop: 10 }}>
            12. Enforcement rights
          </Text>
          <Text allowFontScaling={false}  style={{ ...styles.text, marginTop: 10 }}>
            We are not obligated to monitor access or use of the App. However,
            we reserve the right to do so for purposes of operating and
            maintaining the App, ensuring your compliance with this Agreement,
            and complying with applicable legal requirements. We may disclose
            unlawful conduct to law enforcement authorities, and pursuant to
            valid legal process, we may cooperate with law enforcement
            authorities to prosecute users who violate the law. We reserve the
            right (but are not required) to remove or disable any content posted
            to the App or access to the App at any time, in each case without
            notice and at our sole discretion if we determine in our sole
            discretion that your content or use of the App is objectionable or
            in violation this Agreement.
          </Text>
          <Text allowFontScaling={false}  style={{ ...styles.text, marginTop: 10 }}>
            We may refuse service, close Accounts, and change eligibility
            requirements at any time.
          </Text>
          <Text allowFontScaling={false}  style={{ ...styles.text, marginTop: 10 }}>
            The Company has no liability or responsibility to users of the App
            or any other person or entity for performance or nonperformance of
            the aforementioned activities.
          </Text>
          <Text allowFontScaling={false}  style={{ ...styles.textBold, marginTop: 10 }}>
            13. Changes to the App
          </Text>
          <Text allowFontScaling={false}  style={{ ...styles.text, marginTop: 10 }}>
            From time to time and without prior notice to you, we may change,
            expand, and improve the App. We may also, at any time, cease to
            continue operating part or all of the App or selectively disable
            certain features of the App. Your use of the App does not entitle
            you to the continued provision or availability of the App. Any
            modification or elimination of the App or any particular features
            will be done in our sole and absolute discretion and without an
            ongoing obligation or liability to you.
          </Text>
          <Text allowFontScaling={false}  style={{ ...styles.textBold, marginTop: 10 }}>
            14. Indemnity
          </Text>
          <Text allowFontScaling={false}  style={{ ...styles.text, marginTop: 10 }}>
            You agree to defend, indemnify, and hold the Company, its officers,
            directors, employees, agents, affiliates, representatives,
            licensors, suppliers, partners, advertisers and content providers,
            harmless from and against any claims, actions, demands, liabilities
            and settlements including without limitation, reasonable legal and
            accounting fees, arising out of or resulting from, or alleged to
            result from, your violation of this Agreement.
          </Text>
          <Text allowFontScaling={false}  style={{ ...styles.textBold, marginTop: 10 }}>
            15. Notice and takedown procedures
          </Text>
          <Text allowFontScaling={false}  style={{ ...styles.text, marginTop: 10 }}>
            If you believe any materials accessible on or from the App infringe
            your copyright, you may request removal of those materials (or
            access thereto) from this App by contacting the Company and
            providing the following information:
          </Text>
          <Text allowFontScaling={false}  style={{ ...styles.text, marginTop: 10 }}>
            а. Identification of the copyrighted work that you believe to be
            infringed. Please describe the work, and, where possible, include a
            copy or the location of an authorized version of the work.
          </Text>
          <Text allowFontScaling={false}  style={{ ...styles.text, marginTop: 10 }}>
            b. Identification of the material that you believe to be infringing
            and its location. Please describe the material, and provide us with
            its URL or any other pertinent information that will allow us to
            locate the material.
          </Text>
          <Text allowFontScaling={false}  style={{ ...styles.text, marginTop: 10 }}>
            c. Your name, address, telephone number and (if available) e-mail
            address.
          </Text>
          <Text allowFontScaling={false}  style={{ ...styles.text, marginTop: 10 }}>
            d. A statement that you have a good faith belief that the complained
            use of the materials is not authorized by the copyright owner, its
            agent, or the law.
          </Text>
          <Text allowFontScaling={false}  style={{ ...styles.text, marginTop: 10 }}>
            e. A statement that the information that you have supplied is
            accurate, and indicating that “under penalty of perjury,” you are
            the copyright owner or are authorized to act on the copyright
            owner’s behalf.
          </Text>
          <Text allowFontScaling={false}  style={{ ...styles.text, marginTop: 10 }}>
            f. A signature or the electronic equivalent from the copyright
            holder or authorized representative.
          </Text>
          <Text allowFontScaling={false}  style={{ ...styles.text, marginTop: 10 }}>
            In an effort to protect the rights of copyright owners, the Company
            maintains a policy for the termination, in appropriate
            circumstances, of subscribers and account holders of the App who are
            repeat infringers.
          </Text>
          <Text allowFontScaling={false}  style={{ ...styles.textBold, marginTop: 10 }}>
            Questions and comments
          </Text>
          <Text allowFontScaling={false}  style={{ ...styles.text, marginTop: 10 }}>
            If you have any comments or questions on any part of the App or any
            part of these Terms of Use, require support, or have any claims,
            please contact us at feedback@
          </Text>
          <Text allowFontScaling={false}  style={{ ...styles.text, marginTop: 10 }}>
            The registered office of is at Packages Limited, Walton
            Road, Gulshan Colony Lahore, Punjab.
          </Text>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default TermAndContditions;

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: Colors.Background },
  container: {
    flex: 1,
    backgroundColor: "transparent",
    marginHorizontal: wp(5),
  },
  rowContainer: {
    minHeight: wp(12),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "transparent",
    borderBottomWidth: 2,
    borderBottomColor: Colors.SecondaryOne,
  },
  textStyle: {
    fontSize: 14,
    color: Colors.SecondaryOne,
    textAlign: "left",
    fontFamily: "Causten-Medium",
  },
  text: {
    textAlign: "left",
    fontSize: 14,
    fontFamily: "Causten-Medium",
    color: "#9b2890",
    lineHeight: 15,
  },
  textBold: {
    textAlign: "left",
    fontSize: 14,
    fontFamily: "Causten-Bold",
    color: "#9b2890",
  },
  textBoldMedium: {
    textAlign: "left",
    fontSize: 14,
    fontFamily: "Causten-Bold",
    color: "#9b2890",
  },
});
