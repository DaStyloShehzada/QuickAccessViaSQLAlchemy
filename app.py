from flask import Flask, render_template, request
from dotenv import load_dotenv
import urllib
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import or_

load_dotenv()



app = Flask(__name__)
app.secret_key = b'_5#y2L"F4Q8z\n\xec]/'

params = urllib.parse.quote_plus(
    "driver={ODBC Driver 17 for SQL Server};"
    "database=QuickAccess;"
    "server=DESKTOP-D4OLQNR\SQLEXPRESS;"
    "trusted_Connecton=yes;"
    "UID=prems;"
    "PWD=prem123;"
)
app.config['SQLALCHEMY_DATABASE_URI'] = "postgres://hmvncwnwoauvgg:9526e7e0789e116a88664d7439507af9d138da5bc2e6c69c92109b5550450263@ec2-52-2-6-71.compute-1.amazonaws.com:5432/d5fc4clihg7k0q"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy()
db.init_app(app)
db_entries = []

class QuickAccess(db.Model):
    __tablename__ = 'FIRST_QA_EMP'
    id = db.Column('SEQ_NO', db.Integer, primary_key=True, autoincrement=True)
    LastName = db.Column('LAST_NAME', db.String, default='')
    FirstName = db.Column('FIRST_NAME', db.String, default='')
    Category = db.Column('CATEGORY', db.Integer, default='')


class Categories(db.Model):
    __tablename__ = 'CATEGORIES'
    CATEGORY_ID = db.Column('CATEGORY_ID', db.Integer, primary_key=True, autoincrement=True)
    CATEGORY_NAME = db.Column('CATEGORY_NAME', db.String, default='')

@app.before_first_request
def create_tables():
    db.create_all()
    #conn = db.engine.connect()

    #conn.execute("""insert into "CATEGORIES" ("CATEGORY_NAME") values ('Business')""")

@app.route('/', methods=["GET", "POST"])
def home(lastname="", firstname="", category=""):
    print("9fsfsa")
    if request.method == 'POST':
        lastname = request.form.get('LastName')
        firstname = request.form.get('FirstName')
        category = request.form.get('category')
    Filtered = QuickAccess.query.filter(or_((lastname == ""), (QuickAccess.LastName == lastname)),
                                        or_((firstname == ""), (QuickAccess.FirstName == firstname)),
                                        or_((category == ""), (QuickAccess.Category == category))).all()
    db_entries = [
        (
            entry.id,
            entry.LastName,
            entry.FirstName,
            entry.Category
        )
        for entry in Filtered
    ]
    count = QuickAccess.query.filter(or_((lastname == ""), (QuickAccess.LastName == lastname)),
                                        or_((firstname == ""), (QuickAccess.FirstName == firstname)),
                                        or_((category == ""), (QuickAccess.Category == category))).count()
    person_cat = []
    person_cat = categories()
    print(person_cat)
    return render_template("NewQuickAccess.html", entries=db_entries, lastname=lastname, firstname=firstname, counter=count, selected_cat=category, person_cat=person_cat)

@app.route('/create', methods=["GET", "POST"])
def create():
    if request.method == 'POST':
        lastname = request.form.get('LastName')
        firstname = request.form.get('FirstName')
        category = request.form.get('category')
        quickaccess = QuickAccess(LastName=lastname, FirstName=firstname, Category=category)
        db.session.add(quickaccess)
        db.session.commit()
        return "Record has been Saved."
    user_id = "After Save"
    person_cat = []
    person_cat = categories()
    return render_template("CreateNewUser.html", user=user_id, ClickMenuID="Create", person_cat=person_cat)

@app.route('/delete/<int:user_id>', methods=["GET", "POST"])
def delete(user_id):
    quickaccess = QuickAccess.query.filter_by(id=user_id).first()
    db.session.delete(quickaccess)
    db.session.commit()
    return "Record has been Deleted."

@app.route('/modify/<int:user_id>', methods=["GET", "POST"])
def modify(user_id):
    if request.method == 'POST':
        lastname = request.form.get('LastName')
        firstname = request.form.get('FirstName')
        category = request.form.get('category')

        quickaccess = QuickAccess.query.filter_by(id=user_id).first()
        quickaccess.LastName = lastname
        quickaccess.FirstName = firstname
        quickaccess.Category = category
        db.session.commit()
        return "Record has been Modified."
    records = QuickAccess.query.filter(QuickAccess.id == user_id).first()
    lastname = records.LastName
    firstname = records.FirstName
    category = records.Category
    person_cat = []
    person_cat = categories()
    return render_template("CreateNewUser.html", user=user_id, LastName=lastname, FirstName=firstname, ClickMenuID="Modify", selected_cat=category, person_cat=person_cat)


@app.route('/view/<int:user_id>', methods=["GET", "POST"])
def view(user_id):
    records = records = QuickAccess.query.filter(QuickAccess.id == user_id).first()
    lastname = records.LastName
    firstname = records.FirstName
    category = records.Category
    person_cat = []
    person_cat = categories()
    return render_template("CreateNewUser.html", user=user_id, LastName=lastname, FirstName=firstname,  ClickMenuID="View", selected_cat=category, person_cat=person_cat)


def categories():
    cat = [
        (
            entry.CATEGORY_ID,
            entry.CATEGORY_NAME
        )
        for entry in Categories.query.all()
    ]
    print(cat)
    return cat


if __name__ == '__main__':
    app.run(debug=True)