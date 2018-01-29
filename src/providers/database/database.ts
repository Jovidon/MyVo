import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs/Rx';
 
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
 
const DATABASE_FILE_NAME: string = "mydb.db";
 
@Injectable()
export class DatabaseProvider {
  private db: SQLiteObject;
  private databaseReady: BehaviorSubject<boolean>;
  task: any = [];
 
  constructor(
    private sqlite: SQLite,
    private platform: Platform
  ) {
    this.databaseReady = new BehaviorSubject(false);
    this.platform.ready().then(() => {
        this.sqlite.create({
          name: DATABASE_FILE_NAME,
          location: 'default'
        })
        .then((db: SQLiteObject) => {
          this.db = db;
          this.createTaskTable();
          this.createUserTable();
          this.createGradeTable();
          this.addGrade();
          this.databaseReady.next(true);
        })
        .catch(e => console.log("Database Error: " + e));
      });
  }
 
  getDatabaseState() {
    return this.databaseReady.asObservable();
  }

  private createTaskTable(): void {
    this.db.executeSql("CREATE TABLE IF NOT EXISTS  task( id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, type TEXT, date TEXT)",{})
    .then(() => {
      console.log("Created task Table!");
    })
    .catch(e => console.log(e));
  }


  private createUserTable(): void {
    this.db.executeSql("CREATE TABLE IF NOT EXISTS  user( id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, surname TEXT, grade NUMBER, wordcount NUMBER)",{})
    .then(() => {
      console.log("Created user Table!");
    })
    .catch(e => console.log(e));
  }

  private createGradeTable(): void {
    this.db.executeSql("CREATE TABLE IF NOT EXISTS  grade ( mark NUMBER)",{})
    .then(() => {
      console.log("Created grade Table!");
    })
    .catch(e => console.log(e));
  }

  getAllProducts() {
    return this.db.executeSql("SELECT * FROM task", []).then((data) => {
      let task = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          task.push({ id: data.rows.item(i).id, name: data.rows.item(i).name, type: data.rows.item(i).type, date: data.rows.item(i).date });
        }
      }
      console.log('Readly!');
      return task;
    }, e => {
      console.log('Errors: '+ e);
      return [];
    });
  }

  getUser() {
    return this.db.executeSql("SELECT * FROM user", []).then((data) => {
      let task = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          task.push({ id: data.rows.item(i).id, name: data.rows.item(i).name, surname: data.rows.item(i).surname, grade: data.rows.item(i).grade });
        }
      }
      console.log('Readly!');
      return task;
    }, e => {
      console.log('Errors: '+ e);
      return [];
    });
  }

  getGrade() {
    return this.db.executeSql("SELECT * FROM grade", []).then((data) => {
      let task = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          task.push({  mark: data.rows.item(i).mark });
        }
      }
      console.log('Readly!');
      return task;
    }, e => {
      console.log('Errors: '+ e);
      return [];
    });
  }

  addProduct(name, type, date) {
    let data = [name, type, date];
    return this.db.executeSql("INSERT INTO task (name, type, date) VALUES (?, ?, ?)", data)
    .then(data => {
      return data;
    }, e => {
      console.log('Error: ', e);
      return e;
    });
  }
  
  addGrade() {
    
    return this.db.executeSql("INSERT INTO grade (mark) VALUES (?)", 0)
    .then(data => {
      return data;
    }, e => {
      console.log('Error: ', e);
      return e;
    });
  }

  addUser(name, surname) {
    let data = [name, surname];
    return this.db.executeSql("INSERT INTO user (name, surname) VALUES (?, ?)", data)
    .then(data => {
      return data;
    }, e => {
      console.log('Error: ', e);
      return e;
    });
  }

  updateProduct(id, name, type, date) {
    return this.db.executeSql('UPDATE task SET name=?,type=?,date=? WHERE id=?', [name, type, date, id])
    .then(() => {
      console.log('Updated tasks!');
    }, e => {
      console.log('Error: ', e);
      return e;
    });
  }

  updateGrade(mark) {
    return this.db.executeSql('UPDATE grade SET mark=?,', [mark])
    .then(() => {
      console.log('Updated grade!');
    }, e => {
      console.log('Error: ', e);
      return e;
    });
  }

  deleteProduct(id) {
    return this.db.executeSql('DELETE FROM task WHERE id=?', [id])
    .then(() => {
      console.log('Deleted task!');
    }, e => {
      console.log('Error: ', e);
      return e;
    });
  }

  filterItems(searchTerm){
    this.getDatabaseState().subscribe(rdy => {
      if (rdy) {
      this.getAllProducts().then(data => {
          this.task = data;
        });
      }
    });
    return this.task.filter((item) => {
        return item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
  }
 
}