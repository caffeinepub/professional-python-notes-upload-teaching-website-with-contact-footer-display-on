import Text "mo:core/Text";
import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import Array "mo:core/Array";
import Order "mo:core/Order";
import Storage "blob-storage/Storage";
import MixinStorage "blob-storage/Mixin";
import Migration "migration";

(with migration = Migration.run)
actor {
  include MixinStorage();

  type NoteId = Text;
  type NotFoundError = Text;

  type NoteType = {
    #text : Text; // Markdown content
    #pdf : Storage.ExternalBlob; // PDF content
  };

  type Note = {
    title : Text;
    content : NoteType;
  };

  module Note {
    public func compareByTitle(note1 : Note, note2 : Note) : Order.Order {
      Text.compare(note1.title, note2.title);
    };
  };

  let notes = Map.empty<NoteId, Note>();

  public shared ({ caller }) func createTextNote(title : Text, content : Text) : async () {
    if (notes.containsKey(title)) {
      Runtime.trap("A note with this title already exists. ");
    };

    let note : Note = {
      title;
      content = #text(content);
    };

    notes.add(title, note);
  };

  public shared ({ caller }) func createPdfNote(title : Text, pdfBlob : Storage.ExternalBlob) : async () {
    if (notes.containsKey(title)) {
      Runtime.trap("A note with this title already exists. ");
    };

    let note : Note = {
      title;
      content = #pdf(pdfBlob);
    };

    notes.add(title, note);
  };

  public query ({ caller }) func getAllNotes() : async [Note] {
    notes.values().toArray().sort(Note.compareByTitle);
  };

  public query ({ caller }) func viewNote(title : Text) : async Note {
    switch (notes.get(title)) {
      case (null) { Runtime.trap("Requested note does not exist. ") };
      case (?note) { note };
    };
  };

  public shared ({ caller }) func deleteNote(title : Text) : async () {
    switch (notes.get(title)) {
      case (null) { Runtime.trap("Note does not exist. ") };
      case (?note) { ignore notes.remove(title) };
    };
  };

  public query ({ caller }) func downloadPdfNote(title : Text) : async Storage.ExternalBlob {
    switch (notes.get(title)) {
      case (null) { Runtime.trap("Note not found ") };
      case (?note) {
        switch (note.content) {
          case (#pdf(pdfBlob)) { pdfBlob };
          case (#text(_)) {
            Runtime.trap("No pdf found since the note is a text based note ");
          };
        };
      };
    };
  };
};
