/*
 * Example plugin template
 */

jsPsych.plugins['jspsych-consent'] = (function () {

  var plugin = {};

  plugin.info = {
    name: 'jspsych-consent',
    prettyName: 'Participant Consent Form',
    parameters: {}
  };

  plugin.trial = function (display_element, trial) {
    // clear display element and apply default page styles
    display_element.innerHTML = '';
    $('body')
      .css('display', 'block')
      .css('height', 'auto')
      .css('background-color', 'black')
      .css('overflow', 'auto');
    $.scrollify.destroy();

    // make sure page starts at the top every time
    removeHash();
    removeQueryString();

    // change the consent quesitons here
    var questions = [
      '(1) I confirm that I have read and understand the Participant Information Sheet (V' + PIS_version + ', dated ' + PIS_date +'). I have had the opportunity to consider the information, ask questions, and have had these answered satisfactorily.',

      '(2) I understand that my participation is voluntary and that I am free to withdraw at any time, without giving any reason, and without any adverse consequences or academic penalty.',

      '(3) I understand that research data collected during the study may be looked at by designated individuals from the University of Oxford where it is relevant to my taking part in the study. I give permission for these individuals to access my data.',

      '(4) I understand that this project has been reviewed by, and received ethics clearance through, the University of Oxford Central University Research Committee (approval code: ' + CUREC_ID + ').',

      '(5) I understand who will have access to personal data provided, how the data will be stored, and what will happen to the data at the end of the project.',

      '(6) I understand how this research will be written up and published.',

      '(7) I understand how to raise a concern or make a complaint.',

      '(8) I am over 18 and under 60 years of age.',

      '(9) I agree to take part in the above study.'
    ];

    // create page elements
    var intro = createGeneral(
      intro,
      display_element,
      'div',
      'titlepage document-intro',
      'consent-intro',
      '<div><h1>Please read and tick all the checkboxes before proceeding to the experiment.</h1></div>'
    );

    var scrollIcon = scrolldownIndicator(intro, 1, true);

    var ethicsForm = createGeneral(
      ethicsForm,
      display_element,
      'div',
      'document-in-document',
      'consent-form',
      ''
    );
    var instructHeader = createGeneral(
      instructHeader,
      ethicsForm,
      'div',
      'document-header',
      'consent-header',
      ''
    );
    var logo = createGeneral(
      logo,
      instructHeader,
      'div',
      'header-logo',
      'Oxford-logo',
      ''
    );
    var labInfo = createGeneral(
      labInfo,
      instructHeader,
      'div',
      'header-info',
      'header-lab-info',
      '<h2>DEPARTMENT OF EXPERIMENTAL PSYCHOLOGY</h2>'
      + '<h4>New Radcliffe House, Radcliffe Observatory Quarter, Oxford OX2 6GG</h4>'
      + '<b>Professor Nicholas Yeung</b>'
      + '<br>'
      + 'Professor of Cognitive Neuroscience'
      + '<br>'
      + 'Principal Investigator, Attention & Cognitive Control Lab'
      + '<br>'
      + '<i>Email: nicholas.yeung@psy.ox.ac.uk | Tel: +44 (0)1865 271389</i>'
    );
    var title = createGeneral(
      title,
      ethicsForm,
      'div',
      'document-title',
      'consent-title',
      '<h1>ELECTRONIC PARTICIPANT CONSENT FORM</h1>'
      + '<h3>V' + consent_version + ' (revised: ' + consent_date + ')</h3>'
      + '<br>'
      + '<h2>"' + CUREC_studyName + '"</h2>'
      + '<i>This study is aimed at studying the basic information processing steps when people learn, make decisions, and evaluate their own performance in these tasks. Please refer to the Participant Information Sheet for further details.</i>'
    );
    var instructText = createGeneral(
      instructText,
      ethicsForm,
      'div',
      'document-text',
      'consent-text',
      ''
    );
    for (var row = 0; row < 9; row++) {
      var consentRow = createGeneral(
        consentRow,
        instructText,
        'div',
        'document-form-row',
        'consent-row' + row,
        ''
      );
      var consentAnswer = createGeneral(
        consentAnswer,
        consentRow,
        'div',
        'document-form-answer',
        'consent-answer' + row,
        '<form><div class="custom-checkbox"><input id=consentq' + row + '-answer type="checkbox" name="consent' + row + '"/></div></form>'
      );
      var consentQuestion = createGeneral(
        consentQuestion,
        consentRow,
        'div',
        'document-form-question',
        'consent-question' + row,
        '<p>' + questions[row] + '</p>'
      );
    }
    var footer = createGeneral(
      footer,
      ethicsForm,
      'div',
      'document-footer',
      'consent-footer',
      ''
    );
    var instructAcknowledge = createGeneral(
      instructAcknowledge,
      display_element,
      'button',
      'medium-green-button',
      'consent-submit',
      '<div>I have checked the above <br> & I agree to continue</div>'
    );
    $('#consent-submit').css('visibility', 'hidden');

    // define what happens when people click on the consent checkboxes
    $('#consent-text .custom-checkbox').on('click', function(event) {
      // if checkmark is not checked, render it checked
      if ($(event.currentTarget).children('input').prop('checked') == false) {
        $(event.currentTarget).children('input').prop('checked', true);
        $(event.currentTarget).css('border','3px solid rgb(0,0,0)').css('background-color', 'rgb(0,0,0)');
      } else {
        $(event.currentTarget).children('input').prop('checked', false);
        $(event.currentTarget).css('border', '3px solid rgb(170,170,170)').css('background-color', '');
      }
      // if the number of checked items equals the number of questions, then unhide the submit button
      if ($(':checked').length == questions.length) {
        instructAcknowledge.style.visibility = 'visible';
      } else {
        instructAcknowledge.style.visibility = 'hidden';
      }
    });

    // define what happens when people click on the final submit button
    instructAcknowledge.onclick = function() {
      // save the data to jsPsych data object
      dataObject['consented'] = true;
      jsPsych.finishTrial();
      return;
    };

    // make sure page starts at the top
    scrollTop();
  };

  return plugin;
})();