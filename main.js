PennController.ResetPrefix(null)

AddHost("https://aekeser.github.io/stimulus_validation/")

// Participant ID generation
const participantID =
    "P" + Math.random().toString(36).substr(2,8).toUpperCase()

const assignedList =
    Math.random() < 0.5
        ? "presentation_list_1_restructured.csv"
        : "presentation_list_2_restructured.csv"

Header(
    newVar("Participant_ID", participantID).global(),
    newVar("Assigned_List", assignedList).global()
)
.log("Participant_ID", participantID)
.log("Assigned_List", getVar("Assigned_List"))

Sequence("consent", "demographics", "fullscreen", "instructions", "validation", "debrief")

newTrial("consent",

    defaultText
        .css("font-size", "20px")
        .css("line-height", "1.5")
        .css("max-width", "1100px"),

    newCanvas("consent_container", 1200, 80)
        .center()
        .print(),

    newImage("uga_logo", "ugalogo.png")
        .size(500, 57)
        .center()
        .print(),

    newText("title", "<h2>Consent Form for Research Participation</h2>")
        .css("font-size", "28px")
        .center()
        .print(),

    newText("consent_text", `
        <p><b>Study Title:</b> Validation of Auditory-Visual Sentence Processing Stimuli for a Language Comprehension Study</p>

        <p><b>Principal Investigator:</b><br>
        Javad Anjum, MBBS, PhD, CCC-SLP<br>
        Department of Communication Sciences and Special Education<br>
        University of Georgia<br>
        Phone: 706-542-4513<br>
        Email: anjum@uga.edu</p>

        <p><b>Research Assistant:</b><br>
        Ahmet Emre Keser<br>
        Department of Linguistics<br>
        University of Georgia<br>
        Email: aekeser@uga.edu</p>

        <p><b>Purpose of the Study</b><br>
        You are invited to participate in a research study about language comprehension and sentence interpretation.
        The purpose of this study is to evaluate sentence and picture materials that will later be used in a language processing experiment.</p>

        <p><b>Procedures</b><br>
        If you agree to participate, you will listen to spoken sentences, view visual displays, select the picture that best matches each sentence,
        answer brief rating questions about the clarity and quality of the materials, and complete a short demographic questionnaire.</p>

        <p><b>Risks and Discomforts</b><br>
        The risks associated with this study are minimal and are no greater than those encountered in everyday computer use.
        Some participants may experience minor fatigue from listening and responding to repeated items.</p>

        <p><b>Benefits</b><br>
        There may be no direct benefit to you from participating. However, your participation may help researchers improve materials used in language research.</p>

        <p><b>Confidentiality</b><br>
        Your responses will be recorded anonymously or with a participant ID number. No personally identifying information will be included in research reports or publications.</p>

        <p><b>Voluntary Participation</b><br>
        Your participation is voluntary. You may stop participating at any time without penalty. You may skip any question you do not wish to answer.</p>

        <p><b>Eligibility</b><br>
        You must be at least 18 years old to participate in this study.</p>

        <p><b>Consent Statement</b><br>
        By selecting “I agree,” you confirm that you are at least 18 years old, that you have read and understood the information above,
        and that you voluntarily agree to participate in this research study.</p>
    `)
        .print(),

    newCanvas("consent_buttons", 760, 90)
        .add(80, 20, newButton("agree", "I agree to participate").css("font-size", "20px"))
        .add(430, 20, newButton("decline", "I do not agree").css("font-size", "20px"))
        .center()
        .print(),

    newSelector("consent_choice")
        .add(getButton("agree"), getButton("decline"))
        .log()
        .wait(),

    getSelector("consent_choice").test.selected(getButton("agree"))
        .failure(
            clear(),
            newText("thank_you", "<h2>Thank you for your time.</h2><p>You may now close this browser window.</p>")
                .css("font-size", "24px")
                .center()
                .print(),
            newButton("hidden_end_button")
                .wait()
        )
)
.log("Section", "Consent")


newTrial("demographics",

    defaultText
        .css("font-size", "20px")
        .css("line-height", "1.5")
        .css("max-width", "1250px"),

    newImage("uga_logo_demo", "ugalogo.png")
        .size(500,57)
        .center()
        .print(),

    newText("demo_title", "<h2>Demographic and Language Background Questionnaire</h2>")
        .css("font-size", "28px")
        .center()
        .print(),

    newText("age_text", "<p><b>Age:</b></p>").print(),
    newTextInput("age_input")
        .size(200,40)
        .css("font-size","18px")
        .log()
        .print(),

    newText("gender_text", "<p><b>Gender identity:</b></p>").print(),
    newDropDown("gender_dropdown", "Select")
        .add("Female", "Male", "Non-binary", "Prefer not to say", "Prefer to self-describe")
        .css("font-size","18px")
        .log()
        .print(),

    newText("gender_self_text", "<p><b>Please self-describe:</b></p>")
        .css("display","none")
        .print(),
    newTextInput("gender_self_input")
        .size(400,40)
        .css("font-size","18px")
        .css("display","none")
        .log()
        .print(),

    getDropDown("gender_dropdown")
        .callback(
            getDropDown("gender_dropdown").test.selected("Prefer to self-describe")
                .success(
                    getText("gender_self_text").css("display","block"),
                    getTextInput("gender_self_input").css("display","block")
                )
                .failure(
                    getText("gender_self_text").css("display","none"),
                    getTextInput("gender_self_input").css("display","none")
                )
        ),

    newText("education_text", "<p><b>Highest level of education completed:</b></p>").print(),
    newDropDown("education_dropdown", "Select")
        .add("High school", "Associate degree", "Bachelor's degree", "Master's degree", "Doctoral degree", "Other")
        .css("font-size","18px")
        .log()
        .print(),

    newText("country_text", "<p><b>Country/region where you currently live:</b></p>").print(),
    newTextInput("country_input")
        .size(400,40)
        .css("font-size","18px")
        .log()
        .print(),

    newText("english_first_text", "<p><b>Is English your first language?</b></p>").print(),
    newScale("english_first_scale", "Yes", "No")
        .labelsPosition("right")
        .css("font-size","18px")
        .log()
        .print(),

    newText("l1_text", "<p><b>What is your first language?</b></p>")
        .css("display","none")
        .print(),
    newTextInput("l1_input")
        .size(400,40)
        .css("font-size","18px")
        .css("display","none")
        .log()
        .print(),

    newText("proficiency_text", "<p><b>How would you rate your English listening comprehension?</b></p>")
        .css("display","none")
        .print(),
    newDropDown("proficiency_dropdown", "Select")
        .add("Basic", "Conversational", "Proficient", "Fluent", "Native-like")
        .css("font-size","18px")
        .css("display","none")
        .log()
        .print(),

    getScale("english_first_scale")
        .callback(
            getScale("english_first_scale").test.selected("No")
                .success(
                    getText("l1_text").css("display","block"),
                    getTextInput("l1_input").css("display","block"),
                    getText("proficiency_text").css("display","block"),
                    getDropDown("proficiency_dropdown").css("display","block")
                )
                .failure(
                    getText("l1_text").css("display","none"),
                    getTextInput("l1_input").css("display","none"),
                    getText("proficiency_text").css("display","none"),
                    getDropDown("proficiency_dropdown").css("display","none")
                )
        ),

    newText("additional_languages_text", "<p><b>Do you speak any additional languages?</b></p>").print(),
    newScale("additional_languages_scale", "Yes", "No")
        .labelsPosition("right")
        .css("font-size","18px")
        .log()
        .print(),

    newText("additional_languages_list_text", "<p><b>Please list any additional languages you speak:</b></p>")
        .css("display","none")
        .print(),
    newTextInput("additional_languages_input")
        .size(500,40)
        .css("font-size","18px")
        .css("display","none")
        .log()
        .print(),

    getScale("additional_languages_scale")
        .callback(
            getScale("additional_languages_scale").test.selected("Yes")
                .success(
                    getText("additional_languages_list_text").css("display","block"),
                    getTextInput("additional_languages_input").css("display","block")
                )
                .failure(
                    getText("additional_languages_list_text").css("display","none"),
                    getTextInput("additional_languages_input").css("display","none")
                )
        ),

    newText("vision_text", "<p><b>Do you have normal or corrected-to-normal vision?</b></p>").print(),
    newScale("vision_scale", "Yes", "No")
        .labelsPosition("right")
        .css("font-size","18px")
        .log()
        .print(),

    newText("hearing_text", "<p><b>Do you have any hearing difficulties?</b></p>").print(),
    newScale("hearing_scale", "Yes", "No")
        .labelsPosition("right")
        .css("font-size","18px")
        .log()
        .print(),

    newText("disorder_text", "<p><b>Have you ever been diagnosed with a neurological, speech, or language disorder?</b></p>").print(),
    newScale("disorder_scale", "Yes", "No")
        .labelsPosition("right")
        .css("font-size","18px")
        .log()
        .print(),

newText("demo_reminder", "Please answer all required questions before continuing.")
    .css("font-size", "18px")
    .css("color", "red")
    .center(),

newButton("continue_button", "Continue")
    .css("font-size","22px")
    .center()
    .print()
    .wait(
        getTextInput("age_input").test.text(/\S/)
            .and(getDropDown("gender_dropdown").test.selected())
            .and(getDropDown("education_dropdown").test.selected())
            .and(getTextInput("country_input").test.text(/\S/))
            .and(getScale("english_first_scale").test.selected())
            .and(getScale("additional_languages_scale").test.selected())
            .and(getScale("vision_scale").test.selected())
            .and(getScale("hearing_scale").test.selected())
            .and(getScale("disorder_scale").test.selected())
            .failure(
                getText("demo_reminder").print()
            )
    )
,

getTextInput("age_input").test.text(/^(1[8-9]|[2-9][0-9]|1[0-9]{2,})$/)
    .and(getScale("vision_scale").test.selected("Yes"))
    .and(getScale("hearing_scale").test.selected("No"))
    .and(getScale("disorder_scale").test.selected("No"))
    .failure(
        clear(),
        newText("ineligible_message",
            "<h2>Thank you for your interest.</h2><p>Based on your responses, you are not eligible to continue with this study.</p><p>You may now close this browser window.</p>"
        )
            .css("font-size", "24px")
            .center()
            .print(),
        newButton("hidden_ineligible_button")
            .wait()
    )
)
.log("Section","Demographics")

newTrial("fullscreen",

    defaultText
        .css("font-size", "22px")
        .css("line-height", "1.6")
        .css("max-width", "1250px")
        .center(),

    newText("fullscreen_title",
        "<h2>Fullscreen Mode</h2>"
    )
        .css("font-size", "30px")
        .center()
        .print(),

newText("fullscreen_text",
    "<p>For the best experience, this study should be completed in fullscreen mode on a laptop or desktop computer.</p><p>Please do not use a phone or tablet.</p><p>Using fullscreen mode helps ensure that the images, audio, and response areas display correctly throughout the experiment.</p><p>Please click the button below to enter fullscreen mode.</p>"
)
    .print(),

    newButton("enter_fullscreen", "Enter Fullscreen")
        .css("font-size", "24px")
        .center()
        .print()
        .wait(),

    fullscreen()
)
.log("Section", "Fullscreen")

newTrial("instructions",

    defaultText
        .css("font-size", "22px")
        .css("line-height", "1.6")
        .css("max-width", "1250px")
        .center(),

    newImage("uga_logo_instructions", "ugalogo.png")
        .size(500, 57)
        .center()
        .print(),

    newText("instructions_title",
        "<h2>Task Instructions</h2>"
    )
        .css("font-size", "30px")
        .center()
        .print(),

newText("instructions_text", `
    <p>You will now begin the sentence-picture matching task.</p>

    <p>Please complete this study on a laptop or desktop computer. Do not use a phone or tablet.</p>

    <p>Please use headphones or earbuds if possible, or complete the study in a quiet environment where you can clearly hear the spoken sentences.</p>

    <p>The study takes approximately 10–15 minutes to complete.</p>
    <p>Before starting, please make sure your computer audio is turned on and set to a comfortable volume.</p>
    <p>On each trial, you will see four picture frames displayed on the screen and hear one spoken sentence.</p>

    <p>Your task is to use your mouse or trackpad to click the picture that best matches the sentence you hear.</p>

    <p>Please listen carefully before making your selection. In some trials, more than one picture may appear somewhat similar, but you should select the picture that best matches the sentence overall.</p>

    <p>After selecting a picture, you will answer several brief rating questions about the sentence-picture match, the audio clarity, the visual clarity of the pictures, and the overall quality of the item.</p>

    <p>There are no trick questions. Please respond based on your first interpretation of the sentence and picture display.</p>

    <p>Please complete the study in fullscreen mode and avoid refreshing or closing the browser window during the experiment.</p>

    <p>Click the button below when you are ready to begin.</p>
`)
    .print(),

    newButton("start_validation", "Start")
        .css("font-size", "24px")
        .center()
        .print()
        .wait()
)
.log("Section", "Instructions")

Template(assignedList, row =>
    newTrial("validation",

        newVar("Selected_Quadrant", "NA").global(),
        newVar("Selected_Image", "NA").global(),
        newVar("Accuracy", "NA").global(),

        defaultText
            .css("font-size", "20px")
            .css("line-height", "1.35")
            .css("max-width", "1250px")
            .center(),

        newText("instruction", "Click the picture that best matches the sentence you hear.")
            .center()
            .print(),

        newCanvas("grid", 960, 640)
            .add(   0,   0, newImage("UL", row.UL_Image).size(460, 305) )
            .add( 500,   0, newImage("UR", row.UR_Image).size(460, 305) )
            .add(   0, 335, newImage("LL", row.LL_Image).size(460, 305) )
            .add( 500, 335, newImage("LR", row.LR_Image).size(460, 305) )
            .add( 478, 308, newText("center_cross", "+").css("font-size", "36px").css("font-weight", "bold") )
            .center()
            .print(),

        newTimer("pre_audio_delay", 250).start().wait(),

        newAudio("sentence", row.Audio_File)
            .play(),

        newSelector("choice")
            .add(getImage("UL"), getImage("UR"), getImage("LL"), getImage("LR"))
            .once()
            .log()
            .callback(
                getSelector("choice").test.selected(getImage("UL"))
                    .success(
                        getVar("Selected_Quadrant").set("UL"),
                        getVar("Selected_Image").set(row.UL_Image),
                        getVar("Accuracy").set(row.Correct_Response == "UL" ? "1" : "0"),
                        getImage("UL").css("border", "8px solid black")
                    ),
                getSelector("choice").test.selected(getImage("UR"))
                    .success(
                        getVar("Selected_Quadrant").set("UR"),
                        getVar("Selected_Image").set(row.UR_Image),
                        getVar("Accuracy").set(row.Correct_Response == "UR" ? "1" : "0"),
                        getImage("UR").css("border", "8px solid black")
                    ),
                getSelector("choice").test.selected(getImage("LL"))
                    .success(
                        getVar("Selected_Quadrant").set("LL"),
                        getVar("Selected_Image").set(row.LL_Image),
                        getVar("Accuracy").set(row.Correct_Response == "LL" ? "1" : "0"),
                        getImage("LL").css("border", "8px solid black")
                    ),
                getSelector("choice").test.selected(getImage("LR"))
                    .success(
                        getVar("Selected_Quadrant").set("LR"),
                        getVar("Selected_Image").set(row.LR_Image),
                        getVar("Accuracy").set(row.Correct_Response == "LR" ? "1" : "0"),
                        getImage("LR").css("border", "8px solid black")
                    )
            )
            .wait(),

        getVar("Selected_Quadrant").log(),
        getVar("Selected_Image").log(),
        getVar("Accuracy").log(),

        getAudio("sentence").wait("first"),

        newTimer("brief_pause_before_ratings", 300).start().wait(),

        clear(),

        defaultText
            .css("font-size", "20px")
            .css("line-height", "1.4")
            .css("max-width", "1250px")
            .center(),

        newText("ratings_title", "<h2>Item Ratings</h2>")
            .css("font-size", "28px")
            .center()
            .print(),

        newText("ratings_instruction", "Please answer all four questions about the item you just completed.")
            .css("font-size", "20px")
            .center()
            .print(),

        newText("match_question", "<b>1. How well did the spoken sentence match the picture you selected?</b>")
            .print(),

        newDropDown("Sentence_Picture_Match", "Select a rating")
            .add(
    "1 = Completely mismatched",
    "2 = Poor match",
    "3 = Somewhat poor match",
    "4 = Moderate match",
    "5 = Good match",
    "6 = Very good match",
    "7 = Perfect match"
)
            .css("font-size", "18px")
            .log()
            .print(),

        newText("audio_question", "<b>2. How clear and easy to understand was the spoken sentence?</b>")
            .print(),

        newDropDown("Audio_Clarity", "Select a rating")
            .add(
    "1 = Extremely unclear",
    "2 = Very unclear",
    "3 = Somewhat unclear",
    "4 = Moderately clear",
    "5 = Clear",
    "6 = Very clear",
    "7 = Extremely clear"
)
            .css("font-size", "18px")
            .log()
            .print(),

        newText("visual_question", "<b>3. How clear and easy to recognize were the pictures?</b>")
            .print(),

        newDropDown("Visual_Clarity", "Select a rating")
            .add(
    "1 = Extremely unclear",
    "2 = Very unclear",
    "3 = Somewhat unclear",
    "4 = Moderately clear",
    "5 = Clear",
    "6 = Very clear",
    "7 = Extremely clear"
)
            .css("font-size", "18px")
            .log()
            .print(),

        newText("quality_question", "<b>4. Overall, how suitable was this item for a language comprehension study?</b>")
            .print(),

        newDropDown("Overall_Item_Quality", "Select a rating")
            .add(
    "1 = Completely unsuitable",
    "2 = Poor quality",
    "3 = Somewhat weak",
    "4 = Moderately suitable",
    "5 = Good quality",
    "6 = Very suitable",
    "7 = Excellent quality"
)
            .css("font-size", "18px")
            .log()
            .print(),

newText("rating_reminder", "Please select one response for each question before continuing.")
    .css("font-size", "18px")
    .css("color", "red")
    .center(),

newButton("next_trial", "Continue")
    .css("font-size", "22px")
    .center()
    .print()
    .wait(
        getDropDown("Sentence_Picture_Match").test.selected()
            .and(getDropDown("Audio_Clarity").test.selected())
            .and(getDropDown("Visual_Clarity").test.selected())
            .and(getDropDown("Overall_Item_Quality").test.selected())
            .failure(
                getText("rating_reminder").print()
            )
    ),

        newTimer("post_rating_delay", 300).start().wait()
    )
    .log("Trial_No", row.Trial_No)
    .log("Trial_Type", row.Trial_Type)
    .log("Audio_File", row.Audio_File)
    .log("UL_Image", row.UL_Image)
    .log("UR_Image", row.UR_Image)
    .log("LL_Image", row.LL_Image)
    .log("LR_Image", row.LR_Image)
    .log("Target_Position", row.Target_Position)
    .log("Empty_Position", row.Empty_Position)
    .log("Correct_Response", row.Correct_Response)
    .log("Condition", row.Condition)
    .log("Argument_Structure", row.Argument_Structure)
    .log("Syntax", row.Syntax)
    .log("TR_Manipulated", row.TR_Manipulated)
)

newTrial("debrief",

    defaultText
        .css("font-size", "22px")
        .css("line-height", "1.6")
        .css("max-width", "1250px")
        .center(),

    newImage("uga_logo_debrief", "ugalogo.png")
        .size(500, 57)
        .center()
        .print(),

    newText("debrief_title",
        "<h2>Thank You</h2>"
    )
        .css("font-size", "30px")
        .center()
        .print(),

    newText("debrief_text", `
        <p>Thank you for participating in this study.</p>

        <p>Your responses have been successfully recorded.</p>

        <p>The purpose of this study is to evaluate auditory and visual sentence-processing materials that will be used in future language comprehension research.</p>

        <p>Your participation will help improve the quality and reliability of these research materials.</p>

        <p><b>Principal Investigator:</b><br>
        Javad Anjum, MBBS, PhD, CCC-SLP<br>
        Department of Communication Sciences and Special Education<br>
        University of Georgia<br>
        anjum@uga.edu</p>

        <p><b>Research Assistant:</b><br>
        Ahmet Emre Keser<br>
        Department of Linguistics<br>
        University of Georgia<br>
        aekeser@uga.edu</p>

        <p>You may now close this browser window.</p>
    `)
        .print(),

    newButton("end_experiment", "Finish")
        .css("font-size", "24px")
        .center()
        .print()
        .wait()
)
.log("Section", "Debrief")