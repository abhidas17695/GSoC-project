# GSoC project for Internet Archive

## Project description
My GSoC 2017 project for Internet Archive involved building advanced features for the Chrome extension of the WayBack Machine which is a digital archive of the World-Wide-Web. I am deeply grateful to my mentor Mark Graham(mark@archive.org) for letting me be a part of the Internet Archive community.

The project is divided into 5 advanced features , each having a different utility such that people with interest in researching the history of the web may find use .

1. The first advanced feature lets a user see the timestamp of each external page element in a playback page . In a playback page , external page elements (images , videos , iframes ) may have been archived before the page itself . This means that a playback page consists of elements having different timestamps . On mousing over an  external page element, the timestamp of the element is displayed as a tooltip. A user researching temporal cohesion of web pages may find this feature very useful .

2. The second advanced feature lets a user see the structure of a website for any year in the past as a sequences sunburst diagram , also known as a radial tree. By 'structure' we indicate the hierarchy of web pages that stem out of the home page of the web site. This heirarchy is displayed as a radial tree . The data that is used to form the radial trees are derived from Internet Archive's CDX server . 

3. The third advanced feature lets a user navigate to a book on Internet Archive from any Wikipedia page. The Internet Archive has a collection of around 14 million digitized books that anyone can read on their website. Say a user is on a Wikipedia page and wants to refer to a book whose title is on the Wikipedia page. This feature analyses the page for all book titles and checks if the book is available at Internet Archive and if yes , forms a link to the book. This feature was demonstrated at Wikimania 2017 on 11th August by Mark Graham.

4. The fourth advanced feature lets a user look up a person's scientific contributions using the ORCID search API.  The input is a person's name and a list of ORCID's are displayed corresponding to the name. The user can then look at the person's ORCID profile.

5. The last advanced feature lets a user create robust links for his/her web page . Robust links are normal HTML links which can point to both a live web page or an archived web page. The use of this feature is to fight the phenomenon of Link Rot. This feature extends the Memento Project of Los Alamos National Laboratory and Old Dominion University.

In addition to the above 5 advanced features I ported basic features built by Rakesh Naga Chinta for Chrome to Firefox and Edge (https://github.com/abhidas17695/wayback-machine-firefox/tree/v1.8.0 and https://github.com/abhidas17695/wayback-machine-edge).

## Things left to do

1. Advanced feature #2 (radial tree) is buggy. On certain pages (example https://www.whitehouse.gov/) the modal on which the radial tree is displayed loses defined CSS properties. Its almost as if the CSS of the web page 'leaks' into the modal.

2. On the Firefox version, the radial tree feature does not work with URLs selected from the extension's search bar.

3. On the Edge version, the auto-save feature does not work. Also the 'About' button does not work.

## License

Copyright Internet Archive, 2017
AGPL-3


## Credits

- Richard Caceres, @rchrd2
- Mark Graham, @markjohngraham
- Benjamin Mandel
- Kumar Yogesh
- Abhishek Das
- Anton Shiryaev
- Rakesh Naga Chinta
