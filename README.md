# Family3
Is a create-a-family web app (under continuous development) that lets you create a person, partner them up and assign a child to each couple. 
Persons can have multiple partners and can have multiple children. 

<ul>

  <li>Create multiple persons by clicking the Person -> Create Person button.</li>
  <li>Partner them up by creating a family (marrying) through the Family -> Create Family button.</li>
  <li>Assign a child to a couple through Person -> Set Child button.</li>
  <li>Then you can view the family tree on the family tree button. <strong>(Under development)</strong></li>

</ul>

# This simple web app was built on top of Node v14.16.1, React and MongoDB
to run the web application locally follow these instructions :

<ul>
  <li>On the client folder, run <em>npm i</em> to install react dependencies.</li>
  <li>On the server folder, run <em>npm i</em> to install node depedencies. </li>
  <li disabled> Client proxy was set to <em>"http://localhost:5000"</em> because the server was set to listen to port 5000;
  <li>In the server main directory, create a <strong>.env</strong> file. Dotenv will automatically handle environment variables.
  <li>Inside the <strong>.env</strong> file, type in : <em>PORT=5000</em>.
  <li>On the next line, below <em>PORT=5000</em>, type your mongodb URI assigned to DB variable.<br>
  (e.g <em>DB=mongodb+srv://{username}:{password}@cluster1.zhjgs.mongodb.net/{database}?retryWrites=true&w=majority)
  <li>Run <em>npm run dev</em> on the server and <em>npm start</em> on the client. React app will launch on <em>"http://localhost:3000"</em>
</ul>

# If you have any questions, please feel free to dm me or send me an email @ dellosonaryan@gmail.com
# - Aryan S. Delloson
