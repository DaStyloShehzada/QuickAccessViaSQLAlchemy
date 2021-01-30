import os
from flask import Flask, render_template, request
import datetime
from dotenv import load_dotenv
import pyodbc
import sqlparams
import urllib
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import or_

load_dotenv()


def create_app():
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
    app.config['SQLALCHEMY_DATABASE_URI'] = "mssql+pyodbc:///?odbc_connect=%s" % params
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    db = SQLAlchemy()
    db.init_app(app)
    db_entries = []
    query = sqlparams.SQLParams('named', 'qmark')


    class QuickAccess(db.Model):
        __tablename__ = 'FIRST_QA_EMP'
        id = db.Column('SEQ_NO', db.Integer, primary_key=True, autoincrement=True)
        LastName = db.Column('LAST_NAME', db.String, default='')
        FirstName = db.Column('FIRST_NAME', db.String, default='')




    @app.route('/', methods=["GET", "POST"])
    def home(lastname="", firstname=""):
        if request.method == 'POST':
            lastname = request.form.get('LastName')
            firstname = request.form.get('FirstName')
        """sql, params = query.format("SELECT * FROM FIRST_QA_EMP where (:lname = '' OR (LAST_NAME != '' "
                                   "AND LAST_NAME = :lname)) "
                                   "AND (:fname = '' OR (FIRST_NAME != '' AND FIRST_NAME = :fname))",
                                   {"lname": lastname, "fname": firstname})"""
        Filtered = QuickAccess.query.filter(or_((lastname == ""), (QuickAccess.LastName == lastname)),
                                            or_((firstname == ""), (QuickAccess.FirstName == firstname))).all()
        db_entries = [
            (
                entry.id,
                entry.LastName,
                entry.FirstName
            )
            for entry in Filtered
        ]
        count = QuickAccess.query.filter(or_((lastname == ""), (QuickAccess.LastName == lastname)),
                                            or_((firstname == ""), (QuickAccess.FirstName == firstname))).count()
        return render_template("NewQuickAccess.html", entries=db_entries, lastname=lastname, firstname=firstname, counter=count)

    @app.route('/create', methods=["GET", "POST"])
    def create():
        if request.method == 'POST':
            lastname = request.form.get('LastName')
            firstname = request.form.get('FirstName')

            quickaccess = QuickAccess(LastName=lastname, FirstName=firstname)
            db.session.add(quickaccess)
            db.session.commit()
            return "Record has been Saved."
        user_id = "After Save"
        return render_template("CreateNewUser.html", user=user_id, ClickMenuID="Create")

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
            print(lastname + firstname + str(user_id))
            quickaccess = QuickAccess.query.filter_by(id=user_id).first()
            quickaccess.LastName = lastname
            quickaccess.FirstName = firstname
            db.session.commit()
            return "Record has been Modified."
        records = QuickAccess.query.filter(QuickAccess.id == user_id).first()
        lastname = records.LastName
        firstname = records.FirstName
        return render_template("CreateNewUser.html", user=user_id, LastName=lastname, FirstName=firstname, ClickMenuID="Modify")


    @app.route('/view/<int:user_id>', methods=["GET", "POST"])
    def view(user_id):
        records = records = QuickAccess.query.filter(QuickAccess.id == user_id).first()
        lastname = records.LastName
        firstname = records.FirstName
        return render_template("CreateNewUser.html", user=user_id, LastName=lastname, FirstName=firstname, ClickMenuID="View")

    return app
