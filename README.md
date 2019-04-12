# Crunchbase API importer for Google Sheets

Google Sheets Script that fetch company information from the Crunchbase API
The goal of this project is to automatically populate a table with the company information that is given by Crunchbase.

Here is the information that is collected for each company that appears in the first column:
Name / Homepage / Type / Short description / Country / Region / City Name / Facebook URL / Linkedin URL / Twitter URL / Crunchbase URL

For more information, the documentation of the Crunchbase API can be found following this link: https://data.crunchbase.com/docs/using-the-api

### Installing

Go to Google Sheets, open a new file, click on tools, then Script Editor and paste the script.
Add your API credentials in the code (USER_KEY variable)

## Start

Fill in the spreadsheet as seen on the input_example picture
Click on "Crunchbase Data" in the menu and then on "retrieve info for every organization" to run the script

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
