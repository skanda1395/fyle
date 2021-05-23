# API Project: Indian Banks Search Microservice

#### Project Homepage:

- https://indian-banks-api.herokuapp.com/

### User Stories

1. GET Request to `[project_url]/branches/autocomplete?q=RTGS&limit=2&offset=0` and you will receive a list of banks that has query as branch name as JSON response.

Example : `{ "branches":[ { "ifsc":"ABHY0065001", "bank_id":60, "branch":"RTGS-HO", "address":"ABHYUDAYA BANK BLDG., B.NO.71, NEHRU NAGAR, KURLA (E), MUMBAI-400024", "city":"MUMBAI", "district":"GREATER MUMBAI", "state":"MAHARASHTRA" }, { "ifsc":"ABNA0000001", "bank_id":110, "branch":"RTGS-HO", "address": "414 EMPIRE COMPLEX, SENAPATI BAPAT MARG LOWER PAREL WEST MUMBAI 400013", "city":"MUMBAI", "district":"GREATER BOMBAY", "state":"MAHARASHTRA" },`

2. GET Request to `[project_url]/api/branches?q=Bangalore&limit=2&offset=0`and you will receive a list of banks that has that search input string across all columns (check the fields below) as JSON response.

Example : `{ "branches":[ { "ifsc":"ABNA0100318", "bank_id":110, "branch":"BANGALORE", "address":"PRESTIGE TOWERS', GROUND FLOOR, 99 & 100, RESIDENCY ROAD, BANGALORE 560 025.", "city":"BANGALORE", "district":"BANGALORE URBAN", "state":"KARNATAKA" }, { "ifsc":"ADCB0000002", "bank_id":143, "branch":"BANGALORE", "address": "CITI CENTRE, 28, CHURCH STREET, OFF M. G. ROAD BANGALORE 560001", "city":"BANGALORE", "district":"BANGALORE URBAN", "state":"KARNATAKA" }, ] }`

3. If I pass an invalid URL that doesn't follow the valid `https://indian-banks-api.herokuapp.com/branches?q` format, you'll asked to enter inputs in a proper format and reference to the homepage.

#### Creation Example using CURL:

##### Search banks by branch name 👇:

Get 3 banks (since limit = 3) which has 'RTGS' as branch name: \
CURL https://indian-banks-api.herokuapp.com/branches/autocomplete?q=RTGS&limit=3&offset=0 | jq

##### Search banks that matches your input string 👇:

Get 3 banks (since limit = 3) which has 'Bangalore' in any of the columns: \
CURL https://indian-banks-api.herokuapp.com/branches/autocomplete?q=RTGS&limit=3&offset=0 | jq
