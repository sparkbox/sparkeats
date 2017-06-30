# Sparkeats
**Sparkboxers review food and drink places so you can eat right**  
Built with Handlebars, Sass, and Node.js


The 2017 Apprentices would like to invite Sparkboxers to contribute to our goal of creating an awesome site for Sparkboxers to write reviews about the food and drink places visited during both time home and during travel adventures. A little goes a long way for us at this stage. Before we ask for reviews, we need places! We are setting up the listing page and we can make it really robust with submissions of real live brick-and-mortar places.


### Let's get started!
1. **Navigate to sparkbox/appproject2017 on GitHub**.
2. **Click _find file_**. The *find file* button is located next to the big green *Clone or download* button on the right-hand side of the page.
![](http://res.cloudinary.com/dfeuktksm/image/upload/v1498507636/find_file_noe6dy.jpg)
3. **Locate the file _source/data/data.yml_** by typing *"data"* into the search bar. **Click *source/data/data.yml* to see the file contents in GitHub**.
![](http://res.cloudinary.com/dfeuktksm/image/upload/v1498507636/find-data-file_w17ayu.jpg)
4. **Create a new branch**. Just beneath the `< > Code` tab is a drop-down menu that reads `Branch: master`. Click it.
![](http://res.cloudinary.com/dfeuktksm/image/upload/v1498507636/create-new-branch01_kdpwsi.jpg)
5. **Name your branch**: This is your time to shine. Impress us. Hit enter, and you will be redirected to the same content on your new branch.
![](http://res.cloudinary.com/dfeuktksm/image/upload/v1498507636/create-new-branch_rt75ed.jpg)
6. **Click on the pencil icon** to open GitHub's code editor. It is located in the top right of the code viewer.
![](http://res.cloudinary.com/dfeuktksm/image/upload/v1498507637/pencil_vf9p3y.jpg)

#### Next we're going to add some data!

![](https://media.giphy.com/media/JSnKGLvrFvYU8/giphy.gif)

##### Data Template:
Copy the data template below. Paste it into the bottom of `data.yml`. Remove the brackets and their contents, and replace it with your place's data.

    [magically-marvelous-macarons]:
      place-name: [An image taken at Magically Marvelous Macarons]                     
      city: [Pittsburgh]
      state: [PA]
      address: [123 North Main Street[
      phone: [(222) 333-4444]
      place-image: /assets/images/[magically-marvelous-macarons].jpg
      place-image-alt: [Magically Marvelous Macarons]
      place-url: [http://www.magicallymarvelousmacrons.com]
      place-website-display: [www.magicallymarvelousmacrons.com]
      review-page-url: '#'
      number-of-reviews: 0

- `meat-hut`: key to find the place (hyphenated place name)
- `state`: use capitalized abbreviation (OH, PA, etc)
- `place-image`: If you have an image, you will upload it in the next section. The path you need is in the sample data set (`/assets/images/[your-place-name].jpg`), and you will need to remove the brackets and their content (`[your-place-name]` ) and replace it with the filename for your place's image.
- `place-url`: Full URL with http(s)
- `place-website-display`: This is how the website URL will be displayed.
- `review-page-URL`: Do not edit, please.
- `number-of-reviews`: Do not edit, please.

##### Commit Changes
![](http://res.cloudinary.com/dfeuktksm/image/upload/v1498519096/big-green-button.png)

1. At the bottom of the page, you will be able to **write your commit message**. Be descriptive!
2. **Click the big green button**
3. After the page reloads, **click the `< > code` tab** to return to the previous page.
4. If you do not have an image, skip the next section and go to **Submit a Pull Request**.

### Add an Image - _optional_
If you do not have an image, skip this section.

![](https://i.ytimg.com/vi/0Nb7Fic4n7k/hqdefault.jpg)

#### Prep Images

- **Format**: `.jpg` or `.png`
- **File Size**: `150kb` max
- **Image Dimensions**: minimum width of `930px`
- **Naming**:The name of the image file must match the name of the place submitted. For example: Magically Marvelous Macarons should be labeled `magically-marvelous-macarons.jpg`

**Adjust Image Dimensions:** http://imageresize.org/

**Adjust File Size:**  https://compressor.io/compress

#### Submit Image
1. From the top of the repository, click the drop-down menu and **select the branch** that you created when you added your data.  
2. Navigate through the file system to `appproject2017/source/assets/images/`
3. Click `Upload files`
4. Choose your files.
5. **Write your commit message**: _":racehorse: add image: [place]"_ or similar.
6. **Click the big green button** to commit changes.

### Submit a Pull Request
1. You will be redirected back to the main repository and you will see this image:
2. **Click `New Pull Request`**
3. Add any additional information you think is necessary and **click `Create Pull Request`**
5. **Add Assignees**: Heather Taylor and Betty Baker.

## What is the next step?
Once we have a listing page that is robust with different food and drink places, the team will be updated about how they can move forward to submit reviews!

Thanks for your help and enthusiasm!

#### License
&copy; 2017 Sparkbox Apprenticeship
