
const BASE_IP_API_URL        =  'http://ip-api.com';
const DATA_ENDPOINT_TEMPLATE = '/json/{ip_address}';

const infos_area = document.querySelector('.main__center-infos');

function load_no_data_card() 
{

    const no_data_card = document.querySelector('.main__center-infos__none');

    no_data_card.style.display = 'block';
    
}

function load_data(data) 
{

    const data_area = document.querySelector('.main__center-infos__list');

    data_area.innerHTML = '';

    data_area.style.display = 'block';

    // ---

    for (const [info, value] of Object.entries(data)) 
    {

        const info_div = document.createElement('div');
        info_div.className = 'info';

        const info_div_identifier = document.createElement('p');
        info_div_identifier.textContent = info;

        const info_div_value = document.createElement('p');
        info_div_value.textContent = value;

        info_div.appendChild(info_div_identifier);
        info_div.appendChild(info_div_value);

        data_area.appendChild(info_div);

    }

}

function geolocate() 
{

    const ip_address_value = document.getElementById('ip_address_id');

    if ((!ip_address_value.value) || (ip_address_value.value == null) || (typeof ip_address_value.value == 'undefined')) 
    {

        alert('Enter the Target IP Address'); return;

    }

    const fetching_ip_address_url = `${BASE_IP_API_URL}${DATA_ENDPOINT_TEMPLATE.replace('{ip_address}', ip_address_value.value)}`;

    fetch
    (
        fetching_ip_address_url,
        
        {
            method  : 'GET',
            headers : { 'Content-type': 'application/json' }
        }

    ).then( (response) => 
    {

        if (!response.ok) 
        {

            console.error('IP Address Fetching Failure - HTTP GET Request Failed'); alert('Failed to fetch IP Address Data'); return;

        }

        return response.json();

    }).then( (data) => 
    {

        infos_area.style.display = 'block';

        if (data.status != 'success') { load_no_data_card(); return; }

        load_data(data);

    }).catch( (error) => 
    {

        console.error(error.message);

        alert('Failed to fetch IP Address Data');

    });

    ip_address_value.value = '';

}