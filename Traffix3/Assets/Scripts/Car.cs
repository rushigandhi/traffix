using UnityEngine;

public class Car : MonoBehaviour
{

    public static float DAMP_FACTOR = 0.99f;

    public Channel bound;
    public float speed = 4f;

    public float vel = 1f;

    // Start is called before the first frame update
    void Start()
    {
        if (bound.direction == Dir.East || bound.direction == Dir.West)
        {
            // gridOffset = y comp
            transform.localPosition = new Vector3(transform.localPosition.x, transform.localPosition.y, bound.gridOffset);
        }
        else
        {
            // gridOffset = x comp
            transform.localPosition = new Vector3(bound.gridOffset, transform.localPosition.y, transform.localPosition.z);
        }
    }

    // Update is called once per frame
    void Update()
    {
        if (bound != null)
        {
            transform.localEulerAngles = (new Vector3(0f, 0f, bound.rotation()));
            transform.Translate(Vector3.forward * Time.deltaTime * speed * vel);
        }
    }

}
