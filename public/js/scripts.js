var salesforce = salesforce || {};
salesforce.hackathonTemplates = salesforce.hackathonTemplates || (function () {

  /**
    * Generates the All ideas hackathon  template
    * @param {Array} ideas list of all ideas
    * @return {String} hackathonTemplate template string 
    */
  const _showAllHackathonTemplate = function (ideas = []) {
    return ideas.reduce((hackathonTemplate, idea) => {
      const { title, description, id, text } = idea;
      hackathonTemplate = (`${hackathonTemplate}
          <div id="${id}"><hr>
            <h2 class="hackathonTitle">${title}</h2>
          </h5>
          <p class="hackathonDescription">${description}</p>
        </div>`
      );
      return hackathonTemplate;
    }, '');
  }

  /**
   * Generates the load spinner template
   * @param {}
   * @return {String} spinner template string 
   */
  const _getSpinner = function () {
    return (`<div class="text-center" id="spinner">
    <div class="spinner-border" role="status">
      <span class="sr-only">Loading...</span>
    </div>
  </div>`);
  }

  return {
    showAllHackathonTemplate: _showAllHackathonTemplate,
    getSpinner: _getSpinner
  }
})();


salesforce.hackathon = salesforce.hackathon || (function () {
  const BASEURL = "http://localhost:5000";
  const { showAllHackathonTemplate, getSpinner } = salesforce.hackathonTemplates;

  /**
    * Fetches all the Hackathon Ideas
    */
  const _getAllHackathonIdeas = function (ideas) {
    $('#hackathon-wrapper').append(getSpinner());
    const successCb = function (ideas) {
      $('#spinner').remove();
      renderHackathonIdeas(ideas);
    };
    fetchResource(successCb);
  };

  /**
   * Creates Hackathon idea
   */
  const _registerTeam = function () {
    let createData = '';
    const options = {};
    createData = createData + 'teamName=' + $('#teamName').val();
    createData = createData + '&paticipants=' + $('#paticipants').val();
    createData = createData + '&cloud=' + $('#cloud').val();
    createData = createData + '&location=' + $('#location').val();
    options.methodType = 'POST';
    options.urlSuffix = '/createIdea';
    options.data = createData;
    const createCallback = function (response) {
      _getAllHackathonIdeas(response);
    };
    fetchResource(createCallback, options);
  };

  async function fetchResource(successCb, options) {
    options = options || {};
    const prefixURI = BASEURL;
    const genUrl = options.urlSuffix ? (prefixURI + options.urlSuffix) : prefixURI;
    const httpMethodType = options.methodType ? options.methodType : 'GET';
    const apiOptions = {
      method: httpMethodType,
      headers: {
        'Content-type': httpMethodType === 'POST' ? 'application/x-www-form-urlencoded' : 'application/json'
      },
      body: options.data
    }
    const response = await fetch(genUrl, apiOptions);
    if (response.ok) {
      let httpResponse;
      if (options.methodType != 'DELETE') {
        httpResponse = await response.json();
      }
      formatPostsResponse(httpResponse);
      successCb && successCb.call({}, httpResponse);
    } else {
      console.log("HTTP-Error: " + response.status);
    }
  }

  function renderHackathonIdeas(posts, appendToexisting) {
    var ideasHTML = showAllHackathonTemplate(posts);
    if (appendToexisting) {
      $('#hackathon-wrapper').prepend(ideasHTML);
    } else {
      $('#hackathon-wrapper').html(ideasHTML);
    }
  }
  
  return {
    getAllHackathonIdeas: _getAllHackathonIdeas,
    registerTeam: _registerTeam
  }
  
})();




