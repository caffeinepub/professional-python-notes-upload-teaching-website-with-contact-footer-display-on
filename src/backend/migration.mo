import Map "mo:core/Map";
import Storage "blob-storage/Storage";

module {
  type NoteId = Text;
  type OldActor = { notes : Map.Map<NoteId, { title : Text; content : Text }> };
  type NewActor = { notes : Map.Map<NoteId, { title : Text; content : ContentType }> };

  type ContentType = {
    #text : Text;
    #pdf : Storage.ExternalBlob;
  };

  public func run(old : OldActor) : NewActor {
    let migratedNotes = old.notes.map<Text, { title : Text; content : Text }, { title : Text; content : ContentType }>(
      func(_id, oldNote) {
        { oldNote with content = #text(oldNote.content) };
      }
    );
    { notes = migratedNotes };
  };
};
